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
import {
    deleteEventAct,
    eventListAct,
    makeEventAct,
    updateEventAct
} from "@/app/[locale]/admin/event/actions";
import {EventInsert, EventUpdate, Event} from "@/types/models/event";

type DialogMode = "create" | "edit" | null

export default function AdminEventPage() {
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
        location_label: "",
        distance: 0
    })


        useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventListAct()
                //console.log(data)
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
            location_label: "",
            distance: 0
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
            location_label: event.location_label,
            distance: event.distance
        })
    }

    const handleSave = async () => {
        console.log("handleSave")
        if (!eventForm.title.trim() || !eventForm.img.trim() || !eventForm.datetime || !eventForm.location_label.trim()) {
            toast.error("Compila tutti i campi obbligatori")
            return
        }

        if (dialogMode === "create") {
            const newEvent: EventInsert = {
                title: eventForm.title.trim(),
                img: eventForm.img.trim(),
                datetime: new Date(eventForm.datetime).toISOString().replace('T', ' ').slice(0, -5),
                info: eventForm.info.trim(),
                route_url: eventForm.route_url.trim(),
                location_url: eventForm.location_url.trim(),
                location_label: eventForm.location_label.trim(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                distance: eventForm.distance
            }
            const result = await makeEventAct(newEvent);

            setEvents([...events, result])
            toast.success("Evento creato con successo")
        } else if (dialogMode === "edit" && editingEvent) {

            const event = events.find(event =>
                event.id === editingEvent.id
            );

            const updatedEvent: EventUpdate = {
                title: eventForm.title.trim(),
                img: eventForm.img.trim(),
                datetime: new Date(eventForm.datetime).toISOString().replace('T', ' ').slice(0, -5),
                info: eventForm.info.trim(),
                route_url: eventForm.route_url.trim(),
                location_url: eventForm.location_url.trim(),
                location_label: eventForm.location_label.trim(),
                updated_at: new Date().toISOString(),
                distance: eventForm.distance,
                created_at: event?.created_at,
                id: event?.id,
            }

            console.log('page', updatedEvent)
            const eventUpdated = await updateEventAct(updatedEvent);

            setEvents(events.map(event =>
                event.id === eventUpdated.id
                    ? eventUpdated
                    : event
            ))
            toast.success("Evento modificato con successo")
        }

        setDialogMode(null)
        setEditingEvent(null)
    }

    const handleDeleteEvent = async (eventId: number, eventTitle: string) => {
        if (confirm(`Sei sicuro di voler eliminare l'evento "${eventTitle}"?`)) {
            const result = await deleteEventAct(eventId);
            if(result.success) {
                setEvents(events.filter(event => event.id !== eventId))
                toast.success("Evento eliminato con successo")
            }
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
                            <Label htmlFor="distance">Distanza *</Label>
                            <Input
                                id="distance"
                                type="number"
                                value={eventForm.distance}
                                onChange={(e) => setEventForm({ ...eventForm, distance: Number(e.target.value) })}
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
