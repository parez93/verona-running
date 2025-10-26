"use client"

import {useEffect, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Calendar, Edit, Search, Trash2, Users} from "lucide-react"
import {format} from "date-fns"
import {it} from "date-fns/locale"
import {toast} from "sonner"
import {User, UserInsert, UserUpdate} from "@/types/models/user";
import {deleteUserAct, updateUserAct, userListAct} from "@/app/[locale]/admin/user/actions";

export default function AdminUserPage() {
    const [users, setUsers] = useState<User[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [editForm, setEditForm] = useState({
        name: "",
        surname: "",
        date_of_birth: ""
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userListAct()
                setUsers(data);
            } catch (err) {
                console.error("Error fetching account", err);
            } finally {
            }
        };

        fetchUsers();
    }, []);



    // Filtra utenti in base alla ricerca
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.surname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const formatDate = (dateString: string | undefined) => {
        try {
            const date = new Date(dateString ?? '')
            return format(date, "dd/MM/yyyy HH:mm", { locale: it })
        } catch {
            return "N/A"
        }
    }

    const formatDateInput = (dateString: string | null) => {
        if (!dateString) return ""
        try {
            const date = new Date(dateString)
            return format(date, "yyyy-MM-dd")
        } catch {
            return ""
        }
    }

    const getInitials = (name: string, surname: string) => {
        return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase()
    }

    const handleEditClick = (user: User) => {
        setEditingUser(user)
        setEditForm({
            name: user.name ?? "",
            surname: user.surname ?? "",
            date_of_birth: formatDateInput(user.date_of_birth ?? "")
        })
    }

    const handleSaveEdit = async () => {
        if (!editingUser) return

        if (!editForm.name.trim() || !editForm.surname.trim()) {
            toast.error("Nome e cognome sono obbligatori")
            return
        }

        const user = users.find(user =>
            user.id === editingUser.id
        )

        const updatedUser: UserUpdate = {
            ...user,
            name: editForm.name.trim() ?? '',
            surname: editForm.surname.trim() ?? '',
            date_of_birth: editForm.date_of_birth ?? '',
            edited_at: new Date().toISOString() ?? ''
        }

        const userUpdated = await updateUserAct(updatedUser);

        setUsers(users.map(user =>
            user.id === userUpdated.id
                ? userUpdated
                : user
        ))


        toast.success("Utente modificato con successo")
        setEditingUser(null)
    }

    const handleDeleteUser = async (userId: string, userName: string) => {
        if (confirm(`Sei sicuro di voler eliminare l'utente ${userName}?`)) {
            const data = await deleteUserAct(userId)
            if(data.success) {
                setUsers(users.filter(user => user.id !== userId))
                toast.success("Utente eliminato con successo")
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">Gestione Utenti</h1>
                            <p className="text-sm text-muted-foreground">Amministrazione e gestione degli utenti registrati</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Totale Utenti</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users.length}</div>
                            <p className="text-xs text-muted-foreground">Utenti registrati nel sistema</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Risultati Ricerca</CardTitle>
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredUsers.length}</div>
                            <p className="text-xs text-muted-foreground">Utenti trovati</p>
                        </CardContent>
                    </Card>

                    <Card className="sm:col-span-2 lg:col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ultima Modifica</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm font-bold">
                                {users.length > 0 ? formatDate(users[0].edited_at!) : "N/A"}
                            </div>
                            <p className="text-xs text-muted-foreground">Ultimo aggiornamento</p>
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
                                placeholder="Cerca per nome, cognome o ID..."
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
                                        <TableHead className="w-[80px]">Avatar</TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Cognome</TableHead>
                                        <TableHead>Data di Nascita</TableHead>
                                        <TableHead>Ultima Modifica</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead className="text-right">Azioni</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                Nessun utente trovato
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={user.img_base64!} alt={`${user.name} ${user.surname}`} />
                                                        <AvatarFallback>{getInitials(user.name ?? '', user.surname ?? '')}</AvatarFallback>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell className="font-medium">{user.surname}</TableCell>
                                                <TableCell>
                                                    {user.date_of_birth ? formatDate(user.date_of_birth) : (
                                                        <Badge variant="outline" className="text-xs">Non specificata</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {formatDate(user.edited_at!)}
                                                </TableCell>
                                                <TableCell>
                                                    <code className="text-xs bg-muted px-2 py-1 rounded">
                                                        {user.id}
                                                    </code>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleEditClick(user)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-destructive hover:text-destructive"
                                                            onClick={() => handleDeleteUser(user.id, `${user.name} ${user.surname}`)}
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
                    {filteredUsers.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                Nessun utente trovato
                            </CardContent>
                        </Card>
                    ) : (
                        filteredUsers.map((user) => (
                            <Card key={user.id} className="overflow-hidden">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-4 mb-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={user.img_base64!} alt={`${user.name} ${user.surname}`} />
                                            <AvatarFallback>{getInitials(user.name ?? '', user.surname ?? '')}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg truncate">
                                                {user.name} {user.surname}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                ID: <code className="text-xs bg-muted px-1 py-0.5 rounded">{user.id}</code>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Data di Nascita:</span>
                                            {user.date_of_birth ? (
                                                <span className="font-medium">{formatDate(user.date_of_birth)}</span>
                                            ) : (
                                                <Badge variant="outline" className="text-xs">Non specificata</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Ultima Modifica:</span>
                                            <span className="font-medium text-xs">{formatDate(user.edited_at!)}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => handleEditClick(user)}
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Modifica
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 text-destructive hover:text-destructive"
                                            onClick={() => handleDeleteUser(user.id, `${user.name} ${user.surname}`)}
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

            {/* Edit User Dialog */}
            <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Modifica Utente</DialogTitle>
                        <DialogDescription>
                            Modifica i dati dell&apos;utente. Clicca su salva quando hai finito.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Nome *</Label>
                            <Input
                                id="edit-name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                placeholder="Inserisci il nome"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-surname">Cognome *</Label>
                            <Input
                                id="edit-surname"
                                value={editForm.surname}
                                onChange={(e) => setEditForm({ ...editForm, surname: e.target.value })}
                                placeholder="Inserisci il cognome"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-dob">Data di Nascita</Label>
                            <Input
                                id="edit-dob"
                                type="date"
                                value={editForm.date_of_birth}
                                onChange={(e) => setEditForm({ ...editForm, date_of_birth: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingUser(null)}>
                            Annulla
                        </Button>
                        <Button onClick={handleSaveEdit}>
                            Salva modifiche
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
