"use client"

import React, { useEffect, useMemo, useState } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Search, Bell, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react"

type NotificationType = "badge" | "event" | "challenge" | "leaderboard" | "achievement"

interface AdminNotification {
    id: number
    type: NotificationType
    title: string
    message: string
    icon?: string | null
    actionUrl?: string | null
    assignToAll?: boolean
    meta?: Record<string, any>
    createdAt?: string
    updatedAt?: string
    assigned_count?: number | null
}

export default function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<AdminNotification[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState<number | null>(null)

    const [query, setQuery] = useState("")
    const [filterType, setFilterType] = useState<string>("all")

    // Dialogs
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
    const [editingNotification, setEditingNotification] = useState<AdminNotification | null>(null)

    // Form state
    const [form, setForm] = useState({
        type: "event" as NotificationType,
        title: "",
        message: "",
        icon: "",
        actionUrl: "",
        assignToAll: true,
        assignedUsers: [] as string[] // used by admin if you want to pick explicit users
    })

    const notificationTypes: NotificationType[] = ["badge", "event", "challenge", "leaderboard", "achievement"]

    // fetch list
    const fetchList = async (p = page, q = query, t = filterType) => {
        setLoading(true)
        try {
            const search = q ? `&q=${encodeURIComponent(q)}` : ""
            const type = t && t !== "all" ? `&type=${encodeURIComponent(t)}` : ""
            const res = await fetch(`/api/admin/notifications?page=${p}&perPage=${perPage}${search}${type}`)
            const json = await res.json()
            // adminListNotifications returns { data, count, page, perPage }
            if (json?.data) setNotifications(json.data)
            if (typeof json?.count === "number") setTotal(json.count)
        } catch (err) {
            console.error(err)
            toast.error("Errore nel caricamento delle notifiche")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchList(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perPage])

    const handleSearch = async () => {
        setPage(1)
        await fetchList(1, query, filterType)
    }

    const openCreate = () => {
        setDialogMode("create")
        setEditingNotification(null)
        setForm({ type: "event", title: "", message: "", icon: "", actionUrl: "", assignToAll: true, assignedUsers: [] })
        setIsDialogOpen(true)
    }

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
            assignedUsers: []
        })
        setIsDialogOpen(true)
    }

    const handleSave = async () => {
        try {
            if (!form.title.trim() || !form.message.trim()) {
                toast.error("Titolo e messaggio sono obbligatori")
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
                    meta: {}
                }

                const res = await fetch(`/api/admin/notifications`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })
                const json = await res.json()
                if (json?.data) {
                    setNotifications(prev => [json.data, ...prev])
                    toast.success("Notifica creata")
                    setIsDialogOpen(false)
                } else {
                    throw new Error(json?.error || "Errore creazione")
                }
            } else if (dialogMode === "edit" && editingNotification) {
                const payload = { ...form }
                const res = await fetch(`/api/admin/notifications/${editingNotification.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })
                const json = await res.json()
                if (json?.data) {
                    setNotifications(prev => prev.map(n => (n.id === json.data.id ? json.data : n)))
                    toast.success("Notifica aggiornata")
                    setIsDialogOpen(false)
                } else {
                    throw new Error(json?.error || "Errore aggiornamento")
                }
            }
        } catch (err: any) {
            console.error(err)
            toast.error(err?.message ?? "Errore")
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Sei sicuro di voler eliminare questa notifica?")) return
        try {
            const res = await fetch(`/api/admin/notifications/${id}`, { method: "DELETE" })
            const json = await res.json()
            if (json?.ok) {
                setNotifications(prev => prev.filter(n => n.id !== id))
                toast.success("Notifica eliminata")
            } else {
                throw new Error(json?.error || "Errore eliminazione")
            }
        } catch (err) {
            console.error(err)
            toast.error("Impossibile eliminare")
        }
    }

    const totalPages = useMemo(() => {
        if (!total) return 1
        return Math.max(1, Math.ceil(total / perPage))
    }, [total, perPage])

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
        <div className="min-h-screen bg-background/5 p-6">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Bell className="h-6 w-6 text-[#e67e22]" /> Notifiche (Admin)
                        </h2>
                        <span className="text-sm text-muted-foreground">Gestisci notifiche, assegnazioni e visualizzazioni</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Input placeholder="Cerca per titolo o messaggio" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <Select onValueChange={(v) => setFilterType(v)}>
                            <SelectTrigger className="w-40">
                                <SelectValue>{filterType === "all" ? "Tutti i tipi" : filterType}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tutti</SelectItem>
                                {notificationTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSearch}><Search className="h-4 w-4 mr-2" /> Cerca</Button>
                        <Button variant="secondary" onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Nuova</Button>
                    </div>
                </div>

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
                                    {loading ? (
                                        <TableRow><TableCell colSpan={6}>Caricamento...</TableCell></TableRow>
                                    ) : notifications.length === 0 ? (
                                        <TableRow><TableCell colSpan={6}>Nessuna notifica</TableCell></TableRow>
                                    ) : (
                                        notifications.map(n => (
                                            <TableRow key={n.id}>
                                                <TableCell>{n.id}</TableCell>
                                                <TableCell className="capitalize">{n.type}</TableCell>
                                                <TableCell className="max-w-xs line-clamp-1">{n.title}</TableCell>
                                                <TableCell>{n.assigned_count ?? "-"}</TableCell>
                                                <TableCell>{n.createdAt ? new Date(n.createdAt).toLocaleString("it-IT") : "-"}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={() => openEdit(n)}><Edit className="h-4 w-4" /></Button>
                                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(n.id)}><Trash2 className="h-4 w-4" /></Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" onClick={goPrev}><ChevronLeft className="h-4 w-4" /></Button>
                            <div>Pagina {page} di {totalPages}</div>
                            <Button variant="ghost" onClick={goNext}><ChevronRight className="h-4 w-4" /></Button>
                        </div>

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

                {/* Create / Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{dialogMode === "create" ? "Crea Notifica" : "Modifica Notifica"}</DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 gap-4 py-2">
                            <div>
                                <Label>Tipo</Label>
                                <Select onValueChange={(v) => setForm(f => ({ ...f, type: v as NotificationType }))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue>{form.type}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {notificationTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Titolo</Label>
                                <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
                            </div>

                            <div>
                                <Label>Messaggio</Label>
                                <Textarea value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>Icona (emoji o stringa)</Label>
                                    <Input value={form.icon} onChange={(e) => setForm(f => ({ ...f, icon: e.target.value }))} />
                                </div>
                                <div>
                                    <Label>Action URL</Label>
                                    <Input value={form.actionUrl} onChange={(e) => setForm(f => ({ ...f, actionUrl: e.target.value }))} />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={form.assignToAll}
                                        onChange={(e) => setForm(f => ({ ...f, assignToAll: e.target.checked }))}
                                    />
                                    <span>Assegna a tutti gli utenti</span>
                                </label>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button onClick={() => setIsDialogOpen(false)} variant="ghost">Annulla</Button>
                            <Button onClick={handleSave}>{dialogMode === "create" ? "Crea" : "Salva"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
