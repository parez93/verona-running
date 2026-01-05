"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Search, Bell, Edit, Trash2, Plus, Calendar, CheckCircle2, Users, Eye, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, X, UserCircle } from "lucide-react"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { toast } from "sonner"

// Tipi estesi (adattati alla shape backend)
interface User {
    id: string
    name: string
    surname: string
    img_base64?: string
}

interface NotificationView {
    userId: string
    viewedAt: string | null
}

interface Notification {
    id: number
    type: "badge" | "event" | "challenge" | "leaderboard" | "achievement" | "software"
    title: string
    message: string
    timestamp: string // ISO string
    read?: boolean // derived from viewedBy vs assignedUsers or meta.admin_read
    icon?: string | null
    actionUrl?: string | null
    assignedTo: "all" | string[] // "all" o array di user IDs
    assignedUsers?: User[] // populated from admin-list
    viewedBy: {
        userId: string,
        psn_id: string, is_read: boolean, viewed_at: string, psn_data?: User }[] // raw from backend
    // meta and other DB fields preserved
    [key: string]: any
}

// Dialog / UI state types
type DialogMode = "create" | "edit" | null
type SortField = "date" | "title" | "type" | "views" | "status"
type SortDirection = "asc" | "desc"

const notificationTypes = ["badge", "event", "challenge", "leaderboard", "software", "achievement"] as const
const typeLabels: Record<typeof notificationTypes[number], string> = {
    badge: "Badge",
    event: "Evento",
    challenge: "Sfida",
    leaderboard: "Classifica",
    achievement: "Achievement",
    software: "Novità"
}

const typeColors: Record<typeof notificationTypes[number], string> = {
    badge: "bg-[#e67e22]",
    event: "bg-blue-600",
    challenge: "bg-purple-600",
    leaderboard: "bg-green-600",
    achievement: "bg-yellow-600",
    software: "bg-red-600"
}

// ------------------------------
// Stato componente (inizialmente vuoto; popolato via API)
// ------------------------------
export default function AdminNotifichePage() {
    // dati
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [users, setUsers] = useState<User[]>([])

    // UI state
    const [searchQuery, setSearchQuery] = useState("")
    const [dialogMode, setDialogMode] = useState<DialogMode>(null)
    const [editingNotification, setEditingNotification] = useState<Notification | null>(null)
    const [viewingNotification, setViewingNotification] = useState<Notification | null>(null)
    const [notificationForm, setNotificationForm] = useState({
        type: "event" as Notification["type"],
        title: "",
        message: "",
        icon: "",
        actionUrl: "",
        read: false,
        assignToAll: true,
        selectedUsers: [] as string[]
    })

    // Paginazione
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const [totalCount, setTotalCount] = useState(0)

    // Ordinamento
    const [sortField, setSortField] = useState<SortField>("date")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

    // Filtri
    const [filterType, setFilterType] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [filterUser, setFilterUser] = useState<string>("all")

    // Loading state
    const [loading, setLoading] = useState(false)

    // Helper functions - MUST be defined before sortedNotifications
    const formatDate = (dateIso: string | Date | undefined) => {
        try {
            const d = typeof dateIso === "string" ? new Date(dateIso) : (dateIso || new Date())
            return format(d, "dd/MM/yyyy HH:mm", { locale: it })
        } catch {
            return "N/A"
        }
    }

    const getInitials = (name: string, surname: string) => {
        return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase()
    }

    const getUserById = (userId: string) => {
        return users.find(u => u.id === userId)
    }

    const getAssignedUsersCount = (notification: Notification) => {
        if (notification.assignedTo === "all") return users.length
        return Array.isArray(notification.assignedTo) ? notification.assignedTo.length : 0
    }

    const getViewedUsersCount = (notification: Notification) => {
        return Array.isArray(notification.viewedBy) ? notification.viewedBy.length : 0
    }

    // Conta filtri attivi
    const getActiveFiltersCount = () => {
        let count = 0
        if (filterType !== "all") count++
        if (filterStatus !== "all") count++
        if (filterUser !== "all") count++
        if (searchQuery.trim() !== "") count++
        return count
    }

    // ----------------------------
    // Fetch utenti e notifiche (API)
    // ----------------------------
    const fetchUsers = async () => {
        try {
            const res = await fetch(`/api/user/admin`)
            if (!res.ok) throw new Error("Errore caricamento utenti")
            const json = await res.json()
            // assumiamo json.data o json
            const list = json?.data ?? json
            setUsers(list || [])
        } catch (err: any) {
            console.error("fetchUsers", err)
            toast.error("Impossibile caricare la lista utenti")
        }
    }

    // Fetch notifiche: query builder basato sui filtri
    const fetchNotifications = async (opts?: { page?: number, perPage?: number }) => {
        try {
            setLoading(true)
            const page = opts?.page ?? currentPage
            const perPage = opts?.perPage ?? itemsPerPage
            const params = new URLSearchParams()
            params.set("page", String(page))
            params.set("perPage", String(perPage))
            if (searchQuery) params.set("q", searchQuery)
            if (filterType !== "all") params.set("type", filterType)
            if (filterUser !== "all") params.set("assignedTo", filterUser)
            if (filterStatus === "read") params.set("read", "read")
            if (filterStatus === "unread") params.set("read", "unread")

            const res = await fetch(`/api/notifications/admin?${params.toString()}`)
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || "Errore caricamento notifiche")
            }
            const json = await res.json()
            // backend returns { data, count, page, perPage }
            const data = json?.data ?? []
            // mappiamo shape: convertiamo created_at -> timestamp e populated assignedUsers/viewedBy
            const mapped = (data || []).map((n: any) => ({
                ...n,
                id: n.id,
                type: n.type,
                title: n.title,
                message: n.message,
                timestamp: n.created_at ?? n.timestamp ?? new Date().toISOString(),
                icon: n.icon ?? null,
                actionUrl: n.action_url ?? n.actionUrl ?? null,
                // assignedTo può venire come psn_ntf list oppure assign_to_all
                assignedTo: n.assign_to_all ? "all" : (Array.isArray(n.psn_ntf) ? n.psn_ntf.map((r: any) => r.psn_id) : (n.assignedUsers ? n.assignedUsers.map((u: any) => u.id) : "all")),
                assignedUsers: Array.isArray(n.psn_ntf) ? n.psn_ntf.map((r: any) => r.psn_data).filter(Boolean) : (n.assignedUsers ?? []),
                viewedBy: Array.isArray(n.ntf_view) ? n.ntf_view : (n.viewedBy ?? []),
                meta: n.meta ?? {}
            })) as Notification[]

            console.log(json)
            setNotifications(mapped)
            // reset pagination to provided pages
            setCurrentPage(json?.page ?? page)
            setTotalCount(json.totalCount)
        } catch (err: any) {
            console.error("fetchNotifications", err)
            toast.error("Impossibile caricare le notifiche")
        } finally {
            setLoading(false)
        }
    }

    // Caricamento iniziale
    useEffect(() => {
        fetchUsers()
        fetchNotifications({ page: 1, perPage: itemsPerPage })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetchNotifications({ page: currentPage, perPage: itemsPerPage })
    }, [currentPage])

    // Ricarica quando cambiano filtri/pagina/perPage/search
    useEffect(() => {
        // debounce minimo: semplice timeout
        const t = setTimeout(() => {
            fetchNotifications({ page: 1, perPage: itemsPerPage })
        }, 250)
        return () => clearTimeout(t)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, filterType, filterStatus, filterUser, itemsPerPage])

    // Filtra notifiche in base alla ricerca e filtri (client-side supplementare)
    const filteredNotifications = notifications.filter(notification => {
        const matchesSearch =
            notification.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.type?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesType = filterType === "all" || notification.type === filterType
        // read dedotto: se meta.admin_read presente usalo, altrimenti consideriamo viewedBy non vuoto come letta per tutti
        const isReadFlag = notification.meta?.admin_read ?? (notification.viewedBy && notification.viewedBy.length > 0)
        const matchesStatus = filterStatus === "all" ||
            (filterStatus === "read" && isReadFlag) ||
            (filterStatus === "unread" && !isReadFlag)

        // Filtro per utente: controlla se l'utente è tra gli assegnati
        const matchesUser = filterUser === "all" ||
            notification.assignedTo === "all" ||
            (Array.isArray(notification.assignedTo) && notification.assignedTo.includes(filterUser))

        return matchesSearch && matchesType && matchesStatus && matchesUser
    })

    // Ordina notifiche
    const sortedNotifications = [...filteredNotifications].sort((a, b) => {
        let comparison = 0

        switch (sortField) {
            case "date":
                comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                break
            case "title":
                comparison = (a.title || "").localeCompare(b.title || "")
                break
            case "type":
                comparison = (a.type || "").localeCompare(b.type || "")
                break
            case "views":
                comparison = getViewedUsersCount(a) - getViewedUsersCount(b)
                break
            case "status":
                const aRead = a.meta?.admin_read ?? (a.viewedBy && a.viewedBy.length > 0)
                const bRead = b.meta?.admin_read ?? (b.viewedBy && b.viewedBy.length > 0)
                comparison = (aRead ? 1 : 0) - (bRead ? 1 : 0)
                break
        }

        return sortDirection === "asc" ? comparison : -comparison
    })

    // Paginazione client (UI)
    const totalPages = Math.ceil(totalCount / itemsPerPage || 1)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
/*
    const paginatedNotifications = sortedNotifications.slice(startIndex, endIndex)
*/
    const paginatedNotifications = sortedNotifications

    const unreadCount = notifications.filter(n => !(n.meta?.admin_read ?? (n.viewedBy && n.viewedBy.length > 0))).length

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("desc")
        }
        setCurrentPage(1)
    }

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <ArrowUpDown className="h-4 w-4 ml-1 text-muted-foreground" />
        }
        return sortDirection === "asc" ? (
            <ArrowUp className="h-4 w-4 ml-1 text-[#e67e22]" />
        ) : (
            <ArrowDown className="h-4 w-4 ml-1 text-[#e67e22]" />
        )
    }

    const handlePageChange = (page: number) => {
        console.log(page,totalPages)
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(parseInt(value))
        setCurrentPage(1)
    }

    const resetFilters = () => {
        setSearchQuery("")
        setFilterType("all")
        setFilterStatus("all")
        setFilterUser("all")
        setSortField("date")
        setSortDirection("desc")
        setCurrentPage(1)
    }

    // ---------- CRUD handlers (API) ----------
    const handleCreateClick = () => {
        setDialogMode("create")
        setNotificationForm({
            type: "event",
            title: "",
            message: "",
            icon: "",
            actionUrl: "",
            read: false,
            assignToAll: true,
            selectedUsers: []
        })
    }

    const handleEditClick = (notification: Notification) => {
        setDialogMode("edit")
        setEditingNotification(notification)
        setNotificationForm({
            type: notification.type,
            title: notification.title,
            message: notification.message,
            icon: notification.icon || "",
            actionUrl: notification.actionUrl || "",
            read: notification.meta?.admin_read ?? false,
            assignToAll: notification.assignedTo === "all",
            selectedUsers: notification.assignedTo === "all" ? [] : (Array.isArray(notification.assignedTo) ? notification.assignedTo : [])
        })
    }

    const handleViewClick = async (notification: Notification) => {
        try {
            // Fetch dettagli completi (assigned users + viewedBy)
            const res = await fetch(`/api/notifications/admin/${notification.id}`)
            if (!res.ok) throw new Error("Errore caricamento dettagli")
            const json = await res.json()
            const ntf = json?.notification ?? {}
            // mappa i campi come nella UI
            const mapped = {
                ...notification,
                title: ntf.title ?? notification.title,
                message: ntf.message ?? notification.message,
                icon: ntf.icon ?? notification.icon,
                assignedTo: ntf.assign_to_all ? "all" : (Array.isArray(ntf.assignedUsers) ? ntf.assignedUsers.map((u: any) => u.id) : notification.assignedTo),
                assignedUsers: ntf.assignedUsers ?? notification.assignedUsers ?? [],
                viewedBy: (json?.viewedBy ?? []).map((v: any) => ({ userId: v.id ?? v.psn_id, viewedAt: v.viewedAt ?? v.viewed_at })) // normalize
            }
            setViewingNotification(mapped as Notification)
            console.log('setViewingNotification', mapped)
        } catch (err: any) {
            console.error("handleViewClick", err)
            toast.error("Impossibile caricare i dettagli della notifica")
        }
    }

    const handleSave = async () => {
        if (!notificationForm.title.trim() || !notificationForm.message.trim()) {
            toast.error("Titolo e messaggio sono obbligatori")
            return
        }

        if (!notificationForm.assignToAll && notificationForm.selectedUsers.length === 0) {
            toast.error("Devi selezionare almeno un utente o assegnare a tutti")
            return
        }

        try {
            if (dialogMode === "create") {
                const payload = {
                    type: notificationForm.type,
                    title: notificationForm.title.trim(),
                    message: notificationForm.message.trim(),
                    icon: notificationForm.icon.trim() || null,
                    actionUrl: notificationForm.actionUrl.trim() || null,
                    assignToAll: notificationForm.assignToAll,
                    assignedUsers: notificationForm.assignToAll ? [] : notificationForm.selectedUsers,
                    meta: { admin_read: !!notificationForm.read }
                }
                const res = await fetch(`/api/notifications/admin`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })
                if (!res.ok) throw new Error("Errore creazione notifica")
                const json = await res.json()
                const created = json?.data ?? json
                // ricarica lista
                await fetchNotifications({ page: 1, perPage: itemsPerPage })
                toast.success("Notifica creata con successo")
            } else if (dialogMode === "edit" && editingNotification) {
                const payload = {
                    type: notificationForm.type,
                    title: notificationForm.title.trim(),
                    message: notificationForm.message.trim(),
                    icon: notificationForm.icon.trim() || null,
                    actionUrl: notificationForm.actionUrl.trim() || null,
                    assignToAll: notificationForm.assignToAll,
                    assignedUsers: notificationForm.assignToAll ? [] : notificationForm.selectedUsers,
                    meta: { ...(editingNotification.meta ?? {}), admin_read: !!notificationForm.read }
                }
                const res = await fetch(`/api/notifications/admin/${editingNotification.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })
                if (!res.ok) throw new Error("Errore aggiornamento notifica")
                await fetchNotifications({ page: currentPage, perPage: itemsPerPage })
                toast.success("Notifica modificata con successo")
            }
            setDialogMode(null)
            setEditingNotification(null)
        } catch (err: any) {
            console.error("handleSave", err)
            toast.error("Impossibile salvare la notifica")
        }
    }

    const handleDeleteNotification = async (notificationId: number, notificationTitle: string) => {
        if (!confirm(`Sei sicuro di voler eliminare la notifica "${notificationTitle}"?`)) return
        try {
            const res = await fetch(`/api/notifications/admin/${notificationId}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Errore eliminazione")
            // ricarica
            await fetchNotifications({ page: currentPage, perPage: itemsPerPage })
            toast.success("Notifica eliminata con successo")
        } catch (err: any) {
            console.error("handleDeleteNotification", err)
            toast.error("Impossibile eliminare la notifica")
        }
    }

    const handleToggleRead = async (notificationId: number) => {
        try {
            // Toggle admin_read in meta
            const ntf = notifications.find(n => n.id === notificationId)
            if (!ntf) return
            const current = !!ntf.meta?.admin_read
            const payload = { meta: { ...(ntf.meta ?? {}), admin_read: !current } }
            const res = await fetch(`/api/notifications/admin/${notificationId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            if (!res.ok) throw new Error("Errore toggle read")
            // aggiorna localmente
            setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, meta: { ...(n.meta ?? {}), admin_read: !current } } : n))
        } catch (err: any) {
            console.error("handleToggleRead", err)
            toast.error("Impossibile aggiornare lo stato di lettura")
        }
    }

    const handleCloseDialog = () => {
        setDialogMode(null)
        setEditingNotification(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  top-0 z-10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-[#e67e22]/10 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-[#e67e22]" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">Gestione Notifiche</h1>
                                <p className="text-sm text-muted-foreground">Crea e gestisci le notifiche per gli utenti</p>
                            </div>
                        </div>
                        <Button onClick={handleCreateClick} className="gap-2 bg-[#e67e22] hover:bg-[#e67e22]/90">
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Nuova Notifica</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Totale Notifiche</CardTitle>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{notifications.length}</div>
                            <p className="text-xs text-muted-foreground">Notifiche nel sistema</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Non Lette</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-[#e67e22]">{unreadCount}</div>
                            <p className="text-xs text-muted-foreground">Notifiche non lette</p>
                        </CardContent>
                    </Card>

                    <Card className="sm:col-span-2 lg:col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Risultati Filtrati</CardTitle>
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredNotifications.length}</div>
                            <p className="text-xs text-muted-foreground">Notifiche trovate</p>
                        </CardContent>
                    </Card>
                </div>
                    {/* Filtri e Ricerca - COMPACTED */}
                    <Card className="mb-6 border-[#e67e22]/20 shadow-lg">
                        <CardHeader className="border-b bg-gradient-to-r from-[#e67e22]/5 to-transparent pb-3 pt-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg bg-[#e67e22]/10 flex items-center justify-center">
                                        <Filter className="h-3.5 w-3.5 text-[#e67e22]" />
                                    </div>
                                    <CardTitle className="text-base">Filtri di Ricerca</CardTitle>
                                </div>
                                {getActiveFiltersCount() > 0 && (
                                    <Badge variant="secondary" className="bg-[#e67e22] text-white hover:bg-[#e67e22]/90 text-xs px-2 py-0.5">
                                        {getActiveFiltersCount()}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 pb-4">
                            <div className="space-y-3">
                                {/* Ricerca compatta */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium flex items-center gap-1.5">
                                        <Search className="h-3.5 w-3.5 text-[#e67e22]" />
                                        Ricerca
                                    </Label>
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Cerca per titolo, messaggio o tipo..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-8 pr-8 h-9 text-sm border-[#e67e22]/20 focus-visible:ring-[#e67e22]"
                                        />
                                        {searchQuery && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0.5 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                                onClick={() => setSearchQuery("")}
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Filtri in Grid compatta */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium flex items-center gap-1.5">
                                            <Bell className="h-3.5 w-3.5 text-[#e67e22]" />
                                            Tipo
                                        </Label>
                                        <Select value={filterType} onValueChange={setFilterType}>
                                            <SelectTrigger className="border-[#e67e22]/20 focus:ring-[#e67e22] h-9 text-sm">
                                                <SelectValue placeholder="Tutti" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Tutti i tipi</SelectItem>
                                                {notificationTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {typeLabels[type]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium flex items-center gap-1.5">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-[#e67e22]" />
                                            Stato
                                        </Label>
                                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                                            <SelectTrigger className="border-[#e67e22]/20 focus:ring-[#e67e22] h-9 text-sm">
                                                <SelectValue placeholder="Tutti" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Tutti</SelectItem>
                                                <SelectItem value="read">Lette</SelectItem>
                                                <SelectItem value="unread">Non lette</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium flex items-center gap-1.5">
                                            <UserCircle className="h-3.5 w-3.5 text-[#e67e22]" />
                                            Utente
                                        </Label>
                                        <Select value={filterUser} onValueChange={setFilterUser}>
                                            <SelectTrigger className="border-[#e67e22]/20 focus:ring-[#e67e22] h-9 text-sm">
                                                <SelectValue placeholder="Tutti" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[300px]">
                                                <SelectItem value="all">
                        <span className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5" />
                          Tutti
                        </span>
                                                </SelectItem>
                                                {users.map((user) => (
                                                    <SelectItem key={user.id} value={user.id}>
                          <span className="flex items-center gap-2">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={user.img_base64} />
                              <AvatarFallback className="text-[9px]">
                                {getInitials(user.name, user.surname)}
                              </AvatarFallback>
                            </Avatar>
                              {user.name} {user.surname}
                          </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-medium flex items-center gap-1.5">
                                            <Eye className="h-3.5 w-3.5 text-[#e67e22]" />
                                            Per pagina
                                        </Label>
                                        <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                                            <SelectTrigger className="border-[#e67e22]/20 focus:ring-[#e67e22] h-9 text-sm">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">5</SelectItem>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="25">25</SelectItem>
                                                <SelectItem value="50">50</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Azioni filtri compatte */}
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <div className="text-xs text-muted-foreground">
                                        {getActiveFiltersCount() > 0 ? (
                                            <span className="flex items-center gap-1.5">
                      <Filter className="h-3.5 w-3.5" />
                                                {getActiveFiltersCount()} {getActiveFiltersCount() === 1 ? "filtro" : "filtri"}
                    </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5">
                      <Filter className="h-3.5 w-3.5" />
                      Nessun filtro
                    </span>
                                        )}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={resetFilters}
                                        className="gap-1.5 h-8 border-[#e67e22]/20 text-[#e67e22] hover:bg-[#e67e22]/10 text-xs"
                                        disabled={getActiveFiltersCount() === 0}
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Desktop Table View */}
                    <Card className="hidden md:block">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">Icon</TableHead>
                                            <TableHead className="w-[100px]">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleSort("type")}
                                                    className="h-8 px-2 flex items-center"
                                                >
                                                    Tipo
                                                    {getSortIcon("type")}
                                                </Button>
                                            </TableHead>
                                            <TableHead>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleSort("title")}
                                                    className="h-8 px-2 flex items-center"
                                                >
                                                    Titolo
                                                    {getSortIcon("title")}
                                                </Button>
                                            </TableHead>
                                            <TableHead>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleSort("date")}
                                                    className="h-8 px-2 flex items-center"
                                                >
                                                    Data
                                                    {getSortIcon("date")}
                                                </Button>
                                            </TableHead>
                                            <TableHead className="w-[100px]">Assegnati</TableHead>
                                            <TableHead className="w-[100px]">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleSort("views")}
                                                    className="h-8 px-2 flex items-center"
                                                >
                                                    Visualizz.
                                                    {getSortIcon("views")}
                                                </Button>
                                            </TableHead>
                                            <TableHead className="w-[80px]">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleSort("status")}
                                                    className="h-8 px-2 flex items-center"
                                                >
                                                    Stato
                                                    {getSortIcon("status")}
                                                </Button>
                                            </TableHead>
                                            <TableHead className="text-right">Azioni</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedNotifications.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                                    {loading ? "Caricamento..." : "Nessuna notifica trovata"}
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedNotifications.map((notification) => (
                                                <TableRow key={notification.id}>
                                                    <TableCell>
                                                        <div className="text-2xl">{notification.icon || "🔔"}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={typeColors[notification.type]}>
                                                            {typeLabels[notification.type]}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="font-medium max-w-[200px] truncate">
                                                        {notification.title}
                                                    </TableCell>
                                                    <TableCell className="text-sm">
                                                        {formatDate(notification.timestamp)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <Users className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">
                              {getAssignedUsersCount(notification)}
                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleViewClick(notification)}
                                                            className="h-8 gap-1 hover:bg-[#e67e22]/10"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            <span className="text-sm font-medium">
                              {getViewedUsersCount(notification)}
                            </span>
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleToggleRead(notification.id)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            {notification.meta?.admin_read || (notification.viewedBy && notification.viewedBy.length > 0) ? (
                                                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            ) : (
                                                                <div className="h-2 w-2 rounded-full bg-[#e67e22]" />
                                                            )}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleEditClick(notification)}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="text-destructive hover:text-destructive"
                                                                onClick={() => handleDeleteNotification(notification.id, notification.title)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Paginazione Desktop */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-6 py-4 border-t">
                                    <div className="text-sm text-muted-foreground">
                                        Mostrando {startIndex + 1}-{Math.min(endIndex, sortedNotifications.length)} di {sortedNotifications.length} notifiche
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Precedente
                                        </Button>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i
                                                } else {
                                                    pageNum = currentPage - 2 + i
                                                }
                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        variant={currentPage === pageNum ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={currentPage === pageNum ? "bg-[#e67e22] hover:bg-[#e67e22]/90" : ""}
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Successiva
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {/* Ordinamento Mobile */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Ordina per</Label>
                                    <Select
                                        value={`${sortField}-${sortDirection}`}
                                        onValueChange={(value) => {
                                            const [field, direction] = value.split("-") as [SortField, SortDirection]
                                            setSortField(field)
                                            setSortDirection(direction)
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="date-desc">Data (più recente)</SelectItem>
                                            <SelectItem value="date-asc">Data (meno recente)</SelectItem>
                                            <SelectItem value="title-asc">Titolo (A-Z)</SelectItem>
                                            <SelectItem value="title-desc">Titolo (Z-A)</SelectItem>
                                            <SelectItem value="type-asc">Tipo (A-Z)</SelectItem>
                                            <SelectItem value="type-desc">Tipo (Z-A)</SelectItem>
                                            <SelectItem value="views-desc">Visualizzazioni (più)</SelectItem>
                                            <SelectItem value="views-asc">Visualizzazioni (meno)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {paginatedNotifications.length === 0 ? (
                            <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                    {loading ? "Caricamento..." : "Nessuna notifica trovata"}
                                </CardContent>
                            </Card>
                        ) : (
                            paginatedNotifications.map((notification) => (
                                <Card key={notification.id} className="overflow-hidden">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="text-2xl flex-shrink-0">{notification.icon || "🔔"}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="font-semibold line-clamp-2">{notification.title}</h3>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleToggleRead(notification.id)}
                                                        className="h-6 w-6 p-0 flex-shrink-0"
                                                    >
                                                        {notification.meta?.admin_read || (notification.viewedBy && notification.viewedBy.length > 0) ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                        ) : (
                                                            <div className="h-2 w-2 rounded-full bg-[#e67e22]" />
                                                        )}
                                                    </Button>
                                                </div>
                                                <Badge className={`${typeColors[notification.type]} mb-2`}>
                                                    {typeLabels[notification.type]}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="text-xs text-muted-foreground mb-3 space-y-1">
                                            <div>{formatDate(notification.timestamp)}</div>
                                            <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                          {getAssignedUsersCount(notification)} assegnati
                      </span>
                                                <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                                                    {getViewedUsersCount(notification)} visualizzazioni
                      </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => handleViewClick(notification)}
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                Visualizzazioni
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEditClick(notification)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDeleteNotification(notification.id, notification.title)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}

                        {/* Paginazione Mobile */}
                        {totalPages > 1 && (
                            <Card>
                                <CardContent className="p-4">
                                    <div className="space-y-4">
                                        <div className="text-sm text-center text-muted-foreground">
                                            Pagina {currentPage} di {totalPages}
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                                                    let pageNum
                                                    if (totalPages <= 3) {
                                                        pageNum = i + 1
                                                    } else if (currentPage === 1) {
                                                        pageNum = i + 1
                                                    } else if (currentPage === totalPages) {
                                                        pageNum = totalPages - 2 + i
                                                    } else {
                                                        pageNum = currentPage - 1 + i
                                                    }
                                                    return (
                                                        <Button
                                                            key={pageNum}
                                                            variant={currentPage === pageNum ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={currentPage === pageNum ? "bg-[#e67e22] hover:bg-[#e67e22]/90" : ""}
                                                        >
                                                            {pageNum}
                                                        </Button>
                                                    )
                                                })}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
            </main>

            {/* Create/Edit Notification Dialog */}
            <Dialog open={dialogMode !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {dialogMode === "create" ? "Crea Nuova Notifica" : "Modifica Notifica"}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogMode === "create"
                                ? "Compila i campi per creare una nuova notifica e assegnarla agli utenti."
                                : "Modifica i dati della notifica e gli utenti assegnati."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Tipo *</Label>
                            <Select
                                value={notificationForm.type}
                                onValueChange={(value) => setNotificationForm({ ...notificationForm, type: value as Notification["type"] })}
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Seleziona tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {notificationTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {typeLabels[type]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Titolo *</Label>
                            <Input
                                id="title"
                                value={notificationForm.title}
                                onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                                placeholder="Es: Nuovo Badge Sbloccato! 🏆"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="message">Messaggio *</Label>
                            <Textarea
                                id="message"
                                value={notificationForm.message}
                                onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                                placeholder="Complimenti! Hai sbloccato..."
                                rows={4}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="icon">Icona (emoji)</Label>
                            <Input
                                id="icon"
                                value={notificationForm.icon}
                                onChange={(e) => setNotificationForm({ ...notificationForm, icon: e.target.value })}
                                placeholder="🏆"
                                maxLength={2}
                            />
                            <p className="text-xs text-muted-foreground">Inserisci un emoji (opzionale)</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="actionUrl">URL Azione (opzionale)</Label>
                            <Input
                                id="actionUrl"
                                value={notificationForm.actionUrl}
                                onChange={(e) => setNotificationForm({ ...notificationForm, actionUrl: e.target.value })}
                                placeholder="/gamification?tab=dashboard"
                            />
                            <p className="text-xs text-muted-foreground">URL a cui reindirizzare quando si clicca la notifica</p>
                        </div>

                        {/* Assegnazione Utenti */}
                        <div className="grid gap-3 pt-2 border-t">
                            <Label>Assegna Notifica *</Label>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="assignToAll"
                                    checked={notificationForm.assignToAll}
                                    onCheckedChange={(checked) =>
                                        setNotificationForm({
                                            ...notificationForm,
                                            assignToAll: checked as boolean,
                                            selectedUsers: checked ? [] : notificationForm.selectedUsers
                                        })
                                    }
                                />
                                <Label htmlFor="assignToAll" className="cursor-pointer font-medium">
                                    Assegna a tutti gli utenti ({users.length})
                                </Label>
                            </div>

                            {!notificationForm.assignToAll && (
                                <div className="space-y-2">
                                    <Label className="text-sm text-muted-foreground">
                                        Seleziona utenti specifici ({notificationForm.selectedUsers.length} selezionati)
                                    </Label>
                                    <div className="border rounded-lg p-3 max-h-[250px] overflow-y-auto space-y-2">
                                        {users.map((user) => (
                                            <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
                                                <Checkbox
                                                    id={`user-${user.id}`}
                                                    checked={notificationForm.selectedUsers.includes(user.id)}
                                                    onCheckedChange={() => {
                                                        const isSelected = notificationForm.selectedUsers.includes(user.id)
                                                        if (isSelected) {
                                                            setNotificationForm({
                                                                ...notificationForm,
                                                                selectedUsers: notificationForm.selectedUsers.filter(id => id !== user.id)
                                                            })
                                                        } else {
                                                            setNotificationForm({
                                                                ...notificationForm,
                                                                selectedUsers: [...notificationForm.selectedUsers, user.id]
                                                            })
                                                        }
                                                    }}
                                                />
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.img_base64} />
                                                    <AvatarFallback className="text-xs">
                                                        {getInitials(user.name, user.surname)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <Label htmlFor={`user-${user.id}`} className="cursor-pointer flex-1">
                                                    {user.name} {user.surname}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t">
                            <Checkbox
                                id="read"
                                checked={notificationForm.read}
                                onCheckedChange={(checked) => setNotificationForm({ ...notificationForm, read: checked as boolean })}
                            />
                            <Label htmlFor="read" className="cursor-pointer">
                                Segna come già letta
                            </Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseDialog}>
                            Annulla
                        </Button>
                        <Button onClick={handleSave} className="bg-[#e67e22] hover:bg-[#e67e22]/90">
                            {dialogMode === "create" ? "Crea Notifica" : "Salva Modifiche"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Notification Views Dialog */}
            <Dialog open={!!viewingNotification} onOpenChange={(open) => !open && setViewingNotification(null)}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Visualizzazioni Notifica</DialogTitle>
                        <DialogDescription>
                            Utenti che hanno visualizzato questa notifica
                        </DialogDescription>
                    </DialogHeader>

                    {viewingNotification && (
                        <div className="space-y-4">
                            {/* Notifica Info */}
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="text-2xl">{viewingNotification.icon || "🔔"}</div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold mb-1">{viewingNotification.title}</h4>
                                            <Badge className={typeColors[viewingNotification.type]}>
                                                {typeLabels[viewingNotification.type]}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-[#e67e22]">
                                            {getAssignedUsersCount(viewingNotification)}
                                        </div>
                                        <p className="text-xs text-muted-foreground">Utenti Assegnati</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {getViewedUsersCount(viewingNotification)}
                                        </div>
                                        <p className="text-xs text-muted-foreground">Visualizzazioni</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Lista visualizzazioni */}
                            <div className="space-y-2">
                                <Label>Utenti che hanno visualizzato ({viewingNotification.viewedBy.length})</Label>
                                {viewingNotification.viewedBy.length === 0 ? (
                                    <Card>
                                        <CardContent className="p-8 text-center text-muted-foreground">
                                            Nessun utente ha ancora visualizzato questa notifica
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="border rounded-lg divide-y">
                                        {viewingNotification.viewedBy.map((view) => {
                                            const user = getUserById(view.userId)
                                            if (!user) return null
                                            return (
                                                <div key={view.userId} className="p-3 flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={user.img_base64} />
                                                        <AvatarFallback>
                                                            {getInitials(user.name, user.surname)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium">
                                                            {user.name} {user.surname}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Visualizzato: {formatDate(view.viewed_at)}
                                                        </p>
                                                    </div>
                                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Lista utenti non ancora visualizzato */}
                            {viewingNotification.assignedTo === "all" && viewingNotification.viewedBy.length < users.length && (
                                <div className="space-y-2">
                                    <Label>Utenti che non hanno ancora visualizzato ({users.length - viewingNotification.viewedBy.length})</Label>
                                    <div className="border rounded-lg divide-y max-h-[200px] overflow-y-auto">
                                        {users
                                            .filter(user => !viewingNotification.viewedBy.some(v => v.userId === user.id))
                                            .map((user) => (
                                                <div key={user.id} className="p-3 flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={user.img_base64} />
                                                        <AvatarFallback>
                                                            {getInitials(user.name, user.surname)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium">
                                                            {user.name} {user.surname}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Non ancora visualizzato
                                                        </p>
                                                    </div>
                                                    <div className="h-2 w-2 rounded-full bg-[#e67e22] flex-shrink-0" />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* Lista utenti assegnati specifici */}
                            {viewingNotification.assignedTo !== "all" && (
                                <div className="space-y-2">
                                    <Label>Utenti assegnati non ancora visualizzato</Label>
                                    {viewingNotification.assignedTo.filter(userId =>
                                        !viewingNotification.viewedBy.some(v => v.userId === userId)
                                    ).length === 0 ? (
                                        <Card>
                                            <CardContent className="p-4 text-center text-sm text-muted-foreground">
                                                Tutti gli utenti assegnati hanno visualizzato la notifica! 🎉
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        <div className="border rounded-lg divide-y">
                                            {viewingNotification.assignedTo
                                                .filter(userId => !viewingNotification.viewedBy.some(v => v.userId === userId))
                                                .map((userId) => {
                                                    const user = getUserById(userId)
                                                    if (!user) return null
                                                    return (
                                                        <div key={userId} className="p-3 flex items-center gap-3">
                                                            <Avatar className="h-10 w-10">
                                                                <AvatarImage src={user.img_base64} />
                                                                <AvatarFallback>
                                                                    {getInitials(user.name, user.surname)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium">
                                                                    {user.name} {user.surname}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Non ancora visualizzato
                                                                </p>
                                                            </div>
                                                            <div className="h-2 w-2 rounded-full bg-[#e67e22] flex-shrink-0" />
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button onClick={() => setViewingNotification(null)}>
                            Chiudi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

