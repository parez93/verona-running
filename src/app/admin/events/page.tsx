"use client"

import {useEffect, useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Search, Calendar, Edit, Trash2, Plus, MapPin, Clock } from "lucide-react"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { toast } from "sonner"
import {fetchAdminEventsAction} from "@/app/admin/events/actions";
import {
    Event
} from "@/api/event/event";

/*
interface Event {
    idx: number
    id: number
    title: string
    img: string
    datetime: string
    info: string
    route_url: string
    location_url: string
    location_label: string
    created_at: string
    updated_at: string
}

// Mock data con più eventi
const mockEvents: Event[] = [
    {
        idx: 1,
        id: 3,
        title: "5km Run",
        img: "https://export-download.canva.com/TKQQc/DAGzhCTKQQc/12/0/0001-8989665061518955461.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20251003%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251003T024626Z&X-Amz-Expires=49638&X-Amz-Signature=f6f730b8e8a1f42fb0a2d0fd1b94ae82df6b1d312bdf34c96b317f7110058946&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%272025-09-25.png&response-expires=Fri%2C%2003%20Oct%202025%2016%3A33%3A44%20GMT",
        datetime: "2025-10-10 18:30:00",
        info: "**VRunners:** non riusciamo proprio a stare fermi 😜\n\n📍 **Partenza:** Parco Santa Croce - Verona\n📅 **Quando:** Venerdì 2 Ottobre alle **18:30**\n👟 **Livello:** Aperto a tutti!",
        route_url: "https://connect.garmin.com/modern/course/403594028",
        location_url: "https://maps.app.goo.gl/MJ6p4E2AYWV3RAph9",
        location_label: "Parco Santa Croce - Verona",
        created_at: "2025-10-03 14:43:42+00",
        updated_at: "2025-09-18 12:53:59.866618"
    },
    {
        idx: 2,
        id: 4,
        title: "10km Trail Run",
        img: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800",
        datetime: "2025-10-15 09:00:00",
        info: "**Trail Running** immersi nella natura 🌲\n\n📍 **Partenza:** Rifugio Monte Baldo\n📅 **Quando:** Domenica 15 Ottobre alle **09:00**\n👟 **Livello:** Intermedio",
        route_url: "https://connect.garmin.com/modern/course/403594029",
        location_url: "https://maps.app.goo.gl/example1",
        location_label: "Rifugio Monte Baldo",
        created_at: "2025-10-04 10:20:15+00",
        updated_at: "2025-10-04 10:20:15+00"
    },
    {
        idx: 3,
        id: 5,
        title: "Mezza Maratona Città",
        img: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800",
        datetime: "2025-10-20 08:00:00",
        info: "**21km** attraverso le strade della città 🏃‍♂️\n\n📍 **Partenza:** Piazza Bra\n📅 **Quando:** Venerdì 20 Ottobre alle **08:00**\n👟 **Livello:** Avanzato",
        route_url: "https://connect.garmin.com/modern/course/403594030",
        location_url: "https://maps.app.goo.gl/example2",
        location_label: "Piazza Bra - Verona",
        created_at: "2025-10-05 15:30:22+00",
        updated_at: "2025-10-05 15:30:22+00"
    },
    {
        idx: 4,
        id: 6,
        title: "Corsa Notturna 8km",
        img: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800",
        datetime: "2025-10-25 20:00:00",
        info: "**Corsa notturna** sotto le stelle ✨\n\n📍 **Partenza:** Lungadige Verona\n📅 **Quando:** Mercoledì 25 Ottobre alle **20:00**\n👟 **Livello:** Tutti",
        route_url: "https://connect.garmin.com/modern/course/403594031",
        location_url: "https://maps.app.goo.gl/example3",
        location_label: "Lungadige - Verona",
        created_at: "2025-10-06 09:45:33+00",
        updated_at: "2025-10-06 09:45:33+00"
    }
]
*/

type DialogMode = "create" | "edit" | null

export default function AdminEventiPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [dialogMode, setDialogMode] = useState<DialogMode>(null)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)
    const [eventForm, setEventForm] = useState({
        title: "",
        img: "",
        datetime: "",
        info: "",
        route_url: "",
        location_url: "",
        location_label: ""
    })


        useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchAdminEventsAction()
                console.log(data)
                setEvents(data);
            } catch (err) {
                console.error("Error fetching account", err);
            } finally {
            }
        };

        fetchEvents();
    }, []);

    // Filtra eventi in base alla ricerca
    const filteredEvents = events.filter(event =>
        event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location_label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.info?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return format(date, "dd/MM/yyyy HH:mm", { locale: it })
        } catch {
            return "N/A"
        }
    }

    const formatDateTimeLocal = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return format(date, "yyyy-MM-dd'T'HH:mm")
        } catch {
            return ""
        }
    }

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) > new Date()
    }

    const upcomingEvents = events.filter(e => isUpcoming(e.datetime))

    const handleCreateClick = () => {
        setDialogMode("create")
        setEventForm({
            title: "",
            img: "",
            datetime: "",
            info: "",
            route_url: "",
            location_url: "",
            location_label: ""
        })
    }

    const handleEditClick = (event: Event) => {
        setDialogMode("edit")
        setEditingEvent(event)
        setEventForm({
            title: event.title,
            img: event.img,
            datetime: formatDateTimeLocal(event.datetime),
            info: event.info,
            route_url: event.route_url,
            location_url: event.location_url,
            location_label: event.location_label
        })
    }

    const handleSave = () => {
        if (!eventForm.title.trim() || !eventForm.img.trim() || !eventForm.datetime || !eventForm.location_label.trim()) {
            toast.error("Compila tutti i campi obbligatori")
            return
        }

        if (dialogMode === "create") {
            const newEvent: Event = {
/*
                idx: events.length + 1,
*/
                id: Math.max(...events.map(e => e.id)) + 1,
                title: eventForm.title.trim(),
                img: eventForm.img.trim(),
                datetime: new Date(eventForm.datetime).toISOString().replace('T', ' ').slice(0, -5),
                info: eventForm.info.trim(),
                route_url: eventForm.route_url.trim(),
                location_url: eventForm.location_url.trim(),
                location_label: eventForm.location_label.trim(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
            setEvents([...events, newEvent])
            toast.success("Evento creato con successo")
        } else if (dialogMode === "edit" && editingEvent) {
            setEvents(events.map(event =>
                event.id === editingEvent.id
                    ? {
                        ...event,
                        title: eventForm.title.trim(),
                        img: eventForm.img.trim(),
                        datetime: new Date(eventForm.datetime).toISOString().replace('T', ' ').slice(0, -5),
                        info: eventForm.info.trim(),
                        route_url: eventForm.route_url.trim(),
                        location_url: eventForm.location_url.trim(),
                        location_label: eventForm.location_label.trim(),
                        updated_at: new Date().toISOString()
                    }
                    : event
            ))
            toast.success("Evento modificato con successo")
        }

        setDialogMode(null)
        setEditingEvent(null)
    }

    const handleDeleteEvent = (eventId: number, eventTitle: string) => {
        if (confirm(`Sei sicuro di voler eliminare l'evento "${eventTitle}"?`)) {
            setEvents(events.filter(event => event.id !== eventId))
            toast.success("Evento eliminato con successo")
        }
    }

    const handleCloseDialog = () => {
        setDialogMode(null)
        setEditingEvent(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">Gestione Eventi</h1>
                                <p className="text-sm text-muted-foreground">Crea, modifica ed elimina eventi</p>
                            </div>
                        </div>
                        <Button onClick={handleCreateClick} className="gap-2">
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Nuovo Evento</span>
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
                            <CardTitle className="text-sm font-medium">Totale Eventi</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{events.length}</div>
                            <p className="text-xs text-muted-foreground">Eventi nel sistema</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Prossimi Eventi</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                            <p className="text-xs text-muted-foreground">Eventi futuri</p>
                        </CardContent>
                    </Card>

                    <Card className="sm:col-span-2 lg:col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Risultati Ricerca</CardTitle>
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredEvents.length}</div>
                            <p className="text-xs text-muted-foreground">Eventi trovati</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search Bar */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cerca per titolo, luogo o descrizione..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
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
                                        <TableHead className="w-[100px]">Immagine</TableHead>
                                        <TableHead>Titolo</TableHead>
                                        <TableHead>Data e Ora</TableHead>
                                        <TableHead>Luogo</TableHead>
                                        <TableHead>Stato</TableHead>
                                        <TableHead className="text-right">Azioni</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredEvents.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                Nessun evento trovato
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredEvents.map((event) => (
                                            <TableRow key={event.id}>
                                                <TableCell>
                                                    <img
                                                        src={event.img}
                                                        alt={event.title}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{event.title}</TableCell>
                                                <TableCell className="text-sm">
                                                    {formatDate(event.datetime)}
                                                </TableCell>
                                                <TableCell className="max-w-[200px] truncate">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3 flex-shrink-0" />
                                                        <span>{event.location_label}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {isUpcoming(event.datetime) ? (
                                                        <Badge className="bg-green-600 hover:bg-green-700">Futuro</Badge>
                                                    ) : (
                                                        <Badge variant="outline">Passato</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleEditClick(event)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-destructive hover:text-destructive"
                                                            onClick={() => handleDeleteEvent(event.id, event.title)}
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
                    </CardContent>
                </Card>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {filteredEvents.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                Nessun evento trovato
                            </CardContent>
                        </Card>
                    ) : (
                        filteredEvents.map((event) => (
                            <Card key={event.id} className="overflow-hidden">
                                <div className="relative h-32">
                                    <img
                                        src={event.img}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {isUpcoming(event.datetime) && (
                                        <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                                            Futuro
                                        </Badge>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg mb-3">{event.title}</h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>{formatDate(event.datetime)}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-1">{event.location_label}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => handleEditClick(event)}
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Modifica
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 text-destructive hover:text-destructive"
                                            onClick={() => handleDeleteEvent(event.id, event.title)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Elimina
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </main>

            {/* Create/Edit Event Dialog */}
            <Dialog open={dialogMode !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {dialogMode === "create" ? "Crea Nuovo Evento" : "Modifica Evento"}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogMode === "create"
                                ? "Compila i campi per creare un nuovo evento."
                                : "Modifica i dati dell'evento."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Titolo *</Label>
                            <Input
                                id="title"
                                value={eventForm.title}
                                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                                placeholder="Es: 5km Run"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="img">URL Immagine *</Label>
                            <Input
                                id="img"
                                value={eventForm.img}
                                onChange={(e) => setEventForm({ ...eventForm, img: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="datetime">Data e Ora *</Label>
                            <Input
                                id="datetime"
                                type="datetime-local"
                                value={eventForm.datetime}
                                onChange={(e) => setEventForm({ ...eventForm, datetime: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location_label">Luogo *</Label>
                            <Input
                                id="location_label"
                                value={eventForm.location_label}
                                onChange={(e) => setEventForm({ ...eventForm, location_label: e.target.value })}
                                placeholder="Es: Parco Santa Croce - Verona"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location_url">URL Google Maps</Label>
                            <Input
                                id="location_url"
                                value={eventForm.location_url}
                                onChange={(e) => setEventForm({ ...eventForm, location_url: e.target.value })}
                                placeholder="https://maps.app.goo.gl/..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="route_url">URL Percorso (Garmin)</Label>
                            <Input
                                id="route_url"
                                value={eventForm.route_url}
                                onChange={(e) => setEventForm({ ...eventForm, route_url: e.target.value })}
                                placeholder="https://connect.garmin.com/..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="info">Descrizione (Markdown)</Label>
                            <Textarea
                                id="info"
                                value={eventForm.info}
                                onChange={(e) => setEventForm({ ...eventForm, info: e.target.value })}
                                placeholder="**VRunners:** Descrizione dell'evento..."
                                rows={6}
                                className="font-mono text-sm"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseDialog}>
                            Annulla
                        </Button>
                        <Button onClick={handleSave}>
                            {dialogMode === "create" ? "Crea Evento" : "Salva Modifiche"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
