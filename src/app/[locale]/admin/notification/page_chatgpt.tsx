"use client"

import {useEffect, useState} from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"

import {
    Bell,
    Plus,
    Search,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight, Calendar, Filter, X, CheckCircle2, UserCircle, Users, Eye,
} from "lucide-react"
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Checkbox} from "@/components/ui/checkbox";

// =========================
// TYPES
// =========================

export type NotificationType =
    | "badge"
    | "event"
    | "challenge"
    | "leaderboard"
    | "achievement"

export interface AdminNotification {
    id: number
    type: NotificationType
    title: string
    message: string
    icon?: string
    actionUrl?: string
    assigned_count?: number
    assignToAll?: boolean
    createdAt?: string
}

export default function AdminNotifichePage() {


    // === SEZIONE D — LOGICA COMPLETA ===

    const [notifications, setNotifications] = useState<AdminNotification[]>([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState<number | null>(null)

    const [query, setQuery] = useState("")
    const [filterType, setFilterType] = useState<string>("all")

// DIALOG
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
    const [editingNotification, setEditingNotification] =
        useState<AdminNotification | null>(null)

// FORM
    const [form, setForm] = useState({
        type: "event" as NotificationType,
        title: "",
        message: "",
        icon: "",
        actionUrl: "",
        assignToAll: true,
        assignedUsers: [] as string[],
    })

    const notificationTypes: NotificationType[] = [
        "badge",
        "event",
        "challenge",
        "leaderboard",
        "achievement",
    ]

// ============================================================
// FETCH LIST
// ============================================================

    const fetchList = async (p = page, q = query, t = filterType) => {
        setLoading(true)

        try {
            const search = q ? `&q=${encodeURIComponent(q)}` : ""
            const type = t !== "all" ? `&type=${encodeURIComponent(t)}` : ""

            const res = await fetch(
                `/api/notification/admin?page=${p}&perPage=${perPage}${search}${type}`
            )

            const json = await res.json()

            setNotifications(json.data ?? [])
            if (typeof json.count === "number") setTotal(json.count)
        } catch (err) {
            console.error("Fetch error:", err)
        } finally {
            setLoading(false)
        }
    }

// on mount & when perPage changes
    useEffect(() => {
        fetchList(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perPage])

    const handleSearch = async () => {
        setPage(1)
        await fetchList(1, query, filterType)
    }

// ============================================================
// CREATE
// ============================================================

    const openCreate = () => {
        setDialogMode("create")
        setEditingNotification(null)
        setForm({
            type: "event",
            title: "",
            message: "",
            icon: "",
            actionUrl: "",
            assignToAll: true,
            assignedUsers: [],
        })
        setIsDialogOpen(true)
    }

// ============================================================
// EDIT
// ============================================================

    const openEdit = (ntf: AdminNotification) => {
        setDialogMode("edit")
        setEditingNotification(ntf)
        setForm({
            type: ntf.type,
            title: ntf.title,
            message: ntf.message,
            icon: ntf.icon ?? "",
            actionUrl: ntf.actionUrl ?? "",
            assignToAll: ntf.assignToAll ?? true,
            assignedUsers: [],
        })
        setIsDialogOpen(true)
    }

// ============================================================
// SAVE (CREATE or UPDATE)
// ============================================================

    const handleSave = async () => {
        try {
            if (!form.title.trim() || !form.message.trim()) {
                alert("Titolo e messaggio sono obbligatori")
                return
            }

            if (dialogMode === "create") {
                const payload = {
                    type: form.type,
                    title: form.title,
                    message: form.message,
                    icon: form.icon || undefined,
                    actionUrl: form.actionUrl || undefined,
                    assignToAll: !!form.assignToAll,
                    assignedUsers: form.assignToAll ? undefined : form.assignedUsers,
                    meta: {},
                }

                const res = await fetch(`/api/notification/admin`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload),
                })

                const json = await res.json()

                if (!json?.data) throw new Error(json.error)

                // prepend
                setNotifications((prev) => [json.data, ...prev])
                setIsDialogOpen(false)
            }

            if (dialogMode === "edit" && editingNotification) {
                const payload = {...form}

                const res = await fetch(
                    `/api/notification/admin/${editingNotification.id}`,
                    {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(payload),
                    }
                )

                const json = await res.json()
                if (!json?.data) throw new Error(json.error)

                // update list
                setNotifications((prev) =>
                    prev.map((n) => (n.id === json.data.id ? json.data : n))
                )

                setIsDialogOpen(false)
            }
        } catch (err: any) {
            console.error("Save error:", err)
            alert(err.message ?? "Errore salvataggio")
        }
    }

// ============================================================
// DELETE
// ============================================================

    const handleDelete = async (id: number) => {
        if (!confirm("Sei sicuro di voler eliminare questa notifica?")) return

        try {
            const res = await fetch(`/api/notification/admin/${id}`, {
                method: "DELETE",
            })

            const json = await res.json()

            if (json?.ok) {
                setNotifications((prev) => prev.filter((n) => n.id !== id))
            } else {
                throw new Error(json?.error)
            }
        } catch (err) {
            console.error("Delete error:", err)
            alert("Errore eliminazione")
        }
    }

// ============================================================
// PAGINATION
// ============================================================

    const totalPages = total ? Math.max(1, Math.ceil(total / perPage)) : 1

    const goPrev = async () => {
        const np = Math.max(1, page - 1)
        setPage(np)
        await fetchList(np, query, filterType)
    }

    const goNext = async () => {
        const np = Math.min(totalPages, page + 1)
        setPage(np)
        await fetchList(np, query, filterType)
    }


    return (
        <div className="container mx-auto py-10 flex flex-col gap-6">

{/*
             === SEZIONE A ===
             Header + Toolbar + Filtri + Search + Create Button
*/}
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
                        <Button onClick={openCreate} className="gap-2 bg-[#e67e22] hover:bg-[#e67e22]/90">
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Nuova Notifica</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* === SEZIONE B: TABELLA NOTIFICHE === */
            }

            <Card>
                <CardHeader>
                    <CardTitle>Elenco notifiche</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Titolo</TableHead>
                                    <TableHead>Assegnati</TableHead>
                                    <TableHead>Creato</TableHead>
                                    <TableHead>Azioni</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {/* LOADING */}
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6}>Caricamento...</TableCell>
                                    </TableRow>
                                ) : null}

                                {/* EMPTY */}
                                {!loading && notifications.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6}>Nessuna notifica</TableCell>
                                    </TableRow>
                                ) : null}

                                {/* ROWS */}
                                {!loading &&
                                    notifications.length > 0 &&
                                    notifications.map((n) => (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.id}</TableCell>
                                            <TableCell className="capitalize">{n.type}</TableCell>

                                            <TableCell className="max-w-xs line-clamp-1">
                                                {n.title}
                                            </TableCell>

                                            <TableCell>{n.assigned_count ?? "-"}</TableCell>

                                            <TableCell>
                                                {n.createdAt
                                                    ? new Date(n.createdAt).toLocaleString("it-IT")
                                                    : "-"}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {/* EDIT */}
                                                    <Button size="sm" onClick={() => openEdit(n)}>
                                                        <Edit className="h-4 w-4"/>
                                                    </Button>

                                                    {/* DELETE */}
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(n.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4"/>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>

                {/* FOOTER PAGINATION */}
                <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* PREV */}
                        <Button variant="ghost" onClick={goPrev}>
                            <ChevronLeft className="h-4 w-4"/>
                        </Button>

                        <div>
                            Pagina {page} di {totalPages}
                        </div>

                        {/* NEXT */}
                        <Button variant="ghost" onClick={goNext}>
                            <ChevronRight className="h-4 w-4"/>
                        </Button>
                    </div>

                    {/* PER PAGE */}
                    <div className="flex items-center gap-2">
                        <Label>Items per page</Label>
                        <select
                            value={perPage}
                            onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
                            className="border rounded p-1"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </CardFooter>
            </Card>




            {/* === SEZIONE C: CREATE / EDIT DIALOG === */
            }




            {/* Create/Edit Notification Dialog */}

        </div>
    )

}
