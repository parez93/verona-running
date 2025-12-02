"use client"

import { useState } from "react"
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

// Tipi estesi
interface User {
    idx: number
    edited_at: string
    img_base64: string
    name: string
    surname: string
    date_of_birth: string | null
    id: string
}

interface NotificationView {
    userId: string
    viewedAt: Date
}

interface Notification {
    id: number
    type: "badge" | "event" | "challenge" | "leaderboard" | "achievement"
    title: string
    message: string
    timestamp: Date
    read: boolean
    icon?: string
    actionUrl?: string
    assignedTo: "all" | string[] // "all" o array di user IDs
    viewedBy: NotificationView[] // tracking visualizzazioni
}

// Mock users (stessi della pagina admin utenti)
const mockUsers: User[] = [
    {
        idx: 1,
        edited_at: "2025-10-02 09:40:18.435792+00",
        img_base64: "",
        name: "Federico",
        surname: "Parezzan",
        date_of_birth: "1995-03-15",
        id: "4d779a99-be53-47df-b365-6ea7eec13748"
    },
    {
        idx: 2,
        edited_at: "2025-10-03 14:22:33.123456+00",
        img_base64: "",
        name: "Giulia",
        surname: "Rossi",
        date_of_birth: "1992-07-22",
        id: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c"
    },
    {
        idx: 3,
        edited_at: "2025-10-04 10:15:45.789012+00",
        img_base64: "",
        name: "Marco",
        surname: "Bianchi",
        date_of_birth: "1988-11-30",
        id: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b"
    },
    {
        idx: 4,
        edited_at: "2025-10-05 16:30:12.345678+00",
        img_base64: "",
        name: "Sofia",
        surname: "Esposito",
        date_of_birth: "1998-05-08",
        id: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c"
    },
    {
        idx: 5,
        edited_at: "2025-10-06 08:45:27.901234+00",
        img_base64: "",
        name: "Alessandro",
        surname: "Romano",
        date_of_birth: null,
        id: "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d"
    },
    {
        idx: 6,
        edited_at: "2025-10-06 12:18:55.567890+00",
        img_base64: "",
        name: "Chiara",
        surname: "Ferrari",
        date_of_birth: "1994-09-14",
        id: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e"
    },
    {
        idx: 7,
        edited_at: "2025-10-07 09:05:33.234567+00",
        img_base64: "",
        name: "Luca",
        surname: "Colombo",
        date_of_birth: "1991-12-25",
        id: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f"
    },
    {
        idx: 8,
        edited_at: "2025-10-07 11:32:41.890123+00",
        img_base64: "",
        name: "Valentina",
        surname: "Ricci",
        date_of_birth: "1996-02-18",
        id: "g4j8i9k7-0b1c-2d3e-4f5a-6b7c8d9e0f1a"
    },
    {
        idx: 9,
        edited_at: "2025-10-07 13:50:16.456789+00",
        img_base64: "",
        name: "Davide",
        surname: "Moretti",
        date_of_birth: null,
        id: "h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b"
    },
    {
        idx: 10,
        edited_at: "2025-10-07 15:20:09.678901+00",
        img_base64: "",
        name: "Francesca",
        surname: "Barbieri",
        date_of_birth: "1993-06-11",
        id: "i6l0k1m9-2d3e-4f5a-6b7c-8d9e0f1a2b3c"
    }
]

// Mock data iniziale con assegnazioni e visualizzazioni
const initialNotifications: Notification[] = [
    {
        id: 1,
        type: "badge",
        title: "Nuovo Badge Sbloccato! 🏆",
        message: "Complimenti! Hai sbloccato il badge 'Costante' partecipando a 5 eventi.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        icon: "🏆",
        actionUrl: "/gamification?tab=dashboard",
        assignedTo: "all",
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 20) },
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 15) },
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 10) }
        ]
    },
    {
        id: 2,
        type: "event",
        title: "Nuovo Evento Disponibile",
        message: "Verona Night Run 2024 è ora disponibile per la registrazione! Non perdere questa occasione.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        icon: "📅",
        actionUrl: "/",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748", "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c"],
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 90) }
        ]
    },
    {
        id: 3,
        type: "challenge",
        title: "Sfida Quasi Completata! 💪",
        message: "Sei a solo 1 evento dal completare la sfida 'Partecipa a 3 eventi questo mese'. Continua così!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: false,
        icon: "💪",
        actionUrl: "/gamification?tab=challenges",
        assignedTo: ["b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d"],
        viewedBy: []
    },
    {
        id: 4,
        type: "leaderboard",
        title: "Nuovo Podio! 🥈",
        message: "Complimenti! Sei salito al 2° posto nella classifica mensile. Continua così!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        read: true,
        icon: "🥈",
        actionUrl: "/gamification?tab=leaderboard",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748"],
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 7) }
        ]
    },
    {
        id: 5,
        type: "achievement",
        title: "Traguardo Raggiunto! ⭐",
        message: "Hai raggiunto il livello 3! Ora sei un 'Runner Avanzato'.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
        read: false,
        icon: "⭐",
        actionUrl: "/gamification",
        assignedTo: "all",
        viewedBy: [
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 10) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 9) },
            { userId: "g4j8i9k7-0b1c-2d3e-4f5a-6b7c8d9e0f1a", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 8) },
            { userId: "h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 7) }
        ]
    },
    {
        id: 6,
        type: "event",
        title: "Promemoria Evento",
        message: "La Maratona di Verona inizia tra 3 giorni. Preparati al meglio!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true,
        icon: "⏰",
        actionUrl: "/",
        assignedTo: ["a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d"],
        viewedBy: [
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 20) },
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 18) },
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 16) }
        ]
    },
    {
        id: 7,
        type: "badge",
        title: "Badge Sbloccato: Top 3 🥇",
        message: "Sei arrivato tra i primi 3 alla Verona City Run! Grande prestazione!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
        read: true,
        icon: "🥇",
        actionUrl: "/gamification?tab=dashboard",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748", "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", "i6l0k1m9-2d3e-4f5a-6b7c-8d9e0f1a2b3c"],
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 32) },
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 30) }
        ]
    },
    {
        id: 8,
        type: "challenge",
        title: "Sfida Completata! ✅",
        message: "Hai completato la sfida 'Completa una gara >10 km'. +500 punti guadagnati!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        read: true,
        icon: "✅",
        actionUrl: "/gamification?tab=challenges",
        assignedTo: "all",
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 45) },
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 44) },
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 43) },
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 42) },
            { userId: "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 41) },
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 40) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 39) }
        ]
    },
    {
        id: 9,
        type: "leaderboard",
        title: "Classifica Aggiornata",
        message: "La classifica mensile è stata aggiornata. Controlla la tua posizione!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60),
        read: false,
        icon: "📊",
        actionUrl: "/gamification?tab=leaderboard",
        assignedTo: "all",
        viewedBy: [
            { userId: "h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 55) },
            { userId: "i6l0k1m9-2d3e-4f5a-6b7c-8d9e0f1a2b3c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 54) }
        ]
    },
    {
        id: 10,
        type: "event",
        title: "Evento Completato",
        message: "Grazie per aver partecipato alla Verona Half Marathon! I tuoi punti sono stati aggiornati.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
        read: true,
        icon: "✨",
        actionUrl: "/",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748", "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f"],
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 70) },
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 69) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 68) }
        ]
    },
    {
        id: 11,
        type: "badge",
        title: "Badge Velocità Sbloccato! 🚀",
        message: "Hai corso la tua gara più veloce! Badge 'Fulmine' conquistato.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 84),
        read: false,
        icon: "🚀",
        actionUrl: "/gamification?tab=dashboard",
        assignedTo: ["c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d"],
        viewedBy: [
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 80) }
        ]
    },
    {
        id: 12,
        type: "achievement",
        title: "Primo Evento Completato! 🎉",
        message: "Complimenti per aver completato il tuo primo evento con noi!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
        read: true,
        icon: "🎉",
        actionUrl: "/gamification",
        assignedTo: ["g4j8i9k7-0b1c-2d3e-4f5a-6b7c8d9e0f1a", "h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b"],
        viewedBy: [
            { userId: "g4j8i9k7-0b1c-2d3e-4f5a-6b7c8d9e0f1a", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 92) },
            { userId: "h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 91) }
        ]
    },
    {
        id: 13,
        type: "event",
        title: "Sconto Speciale: Gara Notturna 🌙",
        message: "Iscriviti alla prossima gara notturna con il 20% di sconto! Offerta valida fino a domenica.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 108),
        read: false,
        icon: "🌙",
        actionUrl: "/",
        assignedTo: "all",
        viewedBy: [
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 105) },
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 104) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 103) }
        ]
    },
    {
        id: 14,
        type: "challenge",
        title: "Nuova Sfida Disponibile! 🎯",
        message: "Sfida 'Maratoneta': Completa 5 eventi entro la fine del mese. Ricompensa: 1000 punti!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120),
        read: true,
        icon: "🎯",
        actionUrl: "/gamification?tab=challenges",
        assignedTo: "all",
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 115) },
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 114) },
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 113) },
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 112) },
            { userId: "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 111) },
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 110) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 109) },
            { userId: "g4j8i9k7-0b1c-2d3e-4f5a-6b7c8d9e0f1a", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 108) },
            { userId: "h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 107) }
        ]
    },
    {
        id: 15,
        type: "leaderboard",
        title: "Sei nella Top 10! 🏅",
        message: "Ottimo lavoro! Sei entrato nella Top 10 della classifica generale.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 132),
        read: false,
        icon: "🏅",
        actionUrl: "/gamification?tab=leaderboard",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748", "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e"],
        viewedBy: [
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 130) }
        ]
    },
    {
        id: 16,
        type: "badge",
        title: "Badge Resilienza 💎",
        message: "Hai partecipato a eventi anche con condizioni meteo avverse. Vero spirito sportivo!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144),
        read: true,
        icon: "💎",
        actionUrl: "/gamification?tab=dashboard",
        assignedTo: ["a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f"],
        viewedBy: [
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 140) }
        ]
    },
    {
        id: 17,
        type: "event",
        title: "Registrazioni Aperte: Trail Running ⛰️",
        message: "Nuovo evento trail running in montagna! Posti limitati, registrati subito.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 156),
        read: false,
        icon: "⛰️",
        actionUrl: "/",
        assignedTo: ["c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", "i6l0k1m9-2d3e-4f5a-6b7c-8d9e0f1a2b3c"],
        viewedBy: []
    },
    {
        id: 18,
        type: "achievement",
        title: "Livello 5 Raggiunto! 🌟",
        message: "Incredibile! Sei ora un 'Runner Elite'. Continua così!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168),
        read: true,
        icon: "🌟",
        actionUrl: "/gamification",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748"],
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 165) }
        ]
    },
    {
        id: 19,
        type: "challenge",
        title: "Sfida Stagionale 🍂",
        message: "Sfida autunnale: Corri 50km totali questo mese. Ricompensa: Badge esclusivo 'Autumn Runner'.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 180),
        read: false,
        icon: "🍂",
        actionUrl: "/gamification?tab=challenges",
        assignedTo: "all",
        viewedBy: [
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 175) },
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 174) },
            { userId: "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 173) }
        ]
    },
    {
        id: 20,
        type: "leaderboard",
        title: "Nuova Classifica Settimanale 📈",
        message: "È iniziata una nuova settimana! La classifica è stata azzerata. È il momento di scalare la vetta!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 192),
        read: true,
        icon: "📈",
        actionUrl: "/gamification?tab=leaderboard",
        assignedTo: "all",
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 190) },
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 189) },
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 188) },
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 187) },
            { userId: "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 186) },
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 185) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 184) },
            { userId: "g4j8i9k7-0b1c-2d3e-4f5a-6b7c8d9e0f1a", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 183) },
            { userId: "h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 182) },
            { userId: "i6l0k1m9-2d3e-4f5a-6b7c-8d9e0f1a2b3c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 181) }
        ]
    },
    {
        id: 21,
        type: "event",
        title: "Iscrizioni Aperte: Mezza Maratona Primaverile 🌸",
        message: "Preparati alla prossima mezza maratona di primavera. Early bird fino al 15 marzo!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 204),
        read: false,
        icon: "🌸",
        actionUrl: "/",
        assignedTo: "all",
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 200) },
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 199) }
        ]
    },
    {
        id: 22,
        type: "badge",
        title: "Badge Mattiniero Sbloccato! ☀️",
        message: "Hai partecipato a 3 eventi mattutini. Sei un vero mattiniero!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 216),
        read: true,
        icon: "☀️",
        actionUrl: "/gamification?tab=dashboard",
        assignedTo: ["b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f"],
        viewedBy: [
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 210) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 208) }
        ]
    },
    {
        id: 23,
        type: "challenge",
        title: "Sfida Sociale: Invita un Amico 👥",
        message: "Invita un amico a partecipare e ricevi 200 punti bonus quando si iscrive al primo evento!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 228),
        read: false,
        icon: "👥",
        actionUrl: "/gamification?tab=challenges",
        assignedTo: ["c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", "g4j8i9k7-0b1c-2d3e-4f5a-6b7c8d9e0f1a"],
        viewedBy: []
    },
    {
        id: 24,
        type: "achievement",
        title: "100 Km Percorsi! 🎊",
        message: "Hai raggiunto il traguardo dei 100 km totali. Che percorso straordinario!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 240),
        read: true,
        icon: "🎊",
        actionUrl: "/gamification",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748", "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e"],
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 235) }
        ]
    },
    {
        id: 25,
        type: "leaderboard",
        title: "Top Performer del Mese! 🏆",
        message: "Sei il runner con più punti questo mese! Ricompensa speciale in arrivo.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 252),
        read: false,
        icon: "🏆",
        actionUrl: "/gamification?tab=leaderboard",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748"],
        viewedBy: []
    },
    {
        id: 26,
        type: "event",
        title: "Workshop: Tecnica di Corsa 🎓",
        message: "Iscriviti al workshop gratuito sulla tecnica di corsa. Posti limitati disponibili.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 264),
        read: true,
        icon: "🎓",
        actionUrl: "/",
        assignedTo: "all",
        viewedBy: [
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 260) },
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 258) },
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 256) }
        ]
    },
    {
        id: 27,
        type: "badge",
        title: "Badge Esploratore 🗺️",
        message: "Hai partecipato a eventi in 5 città diverse. Vero esploratore!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 276),
        read: false,
        icon: "🗺️",
        actionUrl: "/gamification?tab=dashboard",
        assignedTo: ["h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b", "i6l0k1m9-2d3e-4f5a-6b7c-8d9e0f1a2b3c"],
        viewedBy: [
            { userId: "i6l0k1m9-2d3e-4f5a-6b7c-8d9e0f1a2b3c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 270) }
        ]
    },
    {
        id: 28,
        type: "challenge",
        title: "Sfida Velocità: Migliora il Tuo Tempo ⚡",
        message: "Batti il tuo record personale nei prossimi 30 giorni. Ricompensa: 750 punti!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 288),
        read: true,
        icon: "⚡",
        actionUrl: "/gamification?tab=challenges",
        assignedTo: "all",
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 285) },
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 283) },
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 281) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 280) }
        ]
    },
    {
        id: 29,
        type: "achievement",
        title: "Veterano della Community 🎖️",
        message: "Sei membro attivo della community da 1 anno! Grazie per il tuo supporto.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 300),
        read: false,
        icon: "🎖️",
        actionUrl: "/gamification",
        assignedTo: ["a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d"],
        viewedBy: []
    },
    {
        id: 30,
        type: "event",
        title: "Gara Benefica: Corri per una Causa ❤️",
        message: "Partecipa alla gara benefica del prossimo mese. Tutti i proventi andranno in beneficenza.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 312),
        read: true,
        icon: "❤️",
        actionUrl: "/",
        assignedTo: "all",
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 308) },
            { userId: "a8f2c3d1-4b5e-6f7a-8b9c-0d1e2f3a4b5c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 307) },
            { userId: "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 306) },
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 305) },
            { userId: "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 304) },
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 303) }
        ]
    },
    {
        id: 31,
        type: "leaderboard",
        title: "Scalata in Classifica 📊",
        message: "Sei salito di 5 posizioni in classifica questa settimana! Ottimo lavoro!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 324),
        read: false,
        icon: "📊",
        actionUrl: "/gamification?tab=leaderboard",
        assignedTo: ["g4j8i9k7-0b1c-2d3e-4f5a-6b7c8d9e0f1a"],
        viewedBy: []
    },
    {
        id: 32,
        type: "badge",
        title: "Badge Resistenza 💪",
        message: "Hai completato 3 maratone consecutive. Resistenza incredibile!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 336),
        read: true,
        icon: "💪",
        actionUrl: "/gamification?tab=dashboard",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748", "b9e3d4f2-5c6d-7e8f-9a0b-1c2d3e4f5a6b"],
        viewedBy: [
            { userId: "4d779a99-be53-47df-b365-6ea7eec13748", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 330) }
        ]
    },
    {
        id: 33,
        type: "challenge",
        title: "Challenge Estiva: 200km in Estate ☀️",
        message: "Corri 200 km totali durante i mesi estivi. Ricompensa: Badge esclusivo 'Summer Runner'!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 348),
        read: false,
        icon: "☀️",
        actionUrl: "/gamification?tab=challenges",
        assignedTo: "all",
        viewedBy: [
            { userId: "c0f4e5g3-6d7e-8f9a-0b1c-2d3e4f5a6b7c", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 345) },
            { userId: "f3i7h8j6-9a0b-1c2d-3e4f-5a6b7c8d9e0f", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 343) }
        ]
    },
    {
        id: 34,
        type: "event",
        title: "Ultimo Giorno: Iscriviti alla Ultra Marathon 🏃",
        message: "Ultime ore per iscriverti alla ultra marathon di 50km. Non perdere questa occasione!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 360),
        read: true,
        icon: "🏃",
        actionUrl: "/",
        assignedTo: ["d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", "h5k9j0l8-1c2d-3e4f-5a6b-7c8d9e0f1a2b"],
        viewedBy: [
            { userId: "d1g5f6h4-7e8f-9a0b-1c2d-3e4f5a6b7c8d", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 355) },
            { userId: "e2h6g7i5-8f9a-0b1c-2d3e-4f5a6b7c8d9e", viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 353) }
        ]
    },
    {
        id: 35,
        type: "achievement",
        title: "Livello 10 Raggiunto! 🌠",
        message: "Livello massimo raggiunto! Sei ora un 'Running Legend'. Congratulazioni!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 372),
        read: false,
        icon: "🌠",
        actionUrl: "/gamification",
        assignedTo: ["4d779a99-be53-47df-b365-6ea7eec13748"],
        viewedBy: []
    }
]

type DialogMode = "create" | "edit" | null
type SortField = "date" | "title" | "type" | "views" | "status"
type SortDirection = "asc" | "desc"

const notificationTypes = ["badge", "event", "challenge", "leaderboard", "achievement"] as const
const typeLabels: Record<typeof notificationTypes[number], string> = {
    badge: "Badge",
    event: "Evento",
    challenge: "Sfida",
    leaderboard: "Classifica",
    achievement: "Achievement"
}

const typeColors: Record<typeof notificationTypes[number], string> = {
    badge: "bg-[#e67e22]",
    event: "bg-blue-600",
    challenge: "bg-purple-600",
    leaderboard: "bg-green-600",
    achievement: "bg-yellow-600"
}

export default function AdminNotifichePage() {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
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

    // Ordinamento
    const [sortField, setSortField] = useState<SortField>("date")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

    // Filtri
    const [filterType, setFilterType] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [filterUser, setFilterUser] = useState<string>("all")

    // Helper functions - MUST be defined before sortedNotifications
    const formatDate = (date: Date) => {
        try {
            return format(date, "dd/MM/yyyy HH:mm", { locale: it })
        } catch {
            return "N/A"
        }
    }

    const getInitials = (name: string, surname: string) => {
        return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase()
    }

    const getUserById = (userId: string) => {
        return mockUsers.find(u => u.id === userId)
    }

    const getAssignedUsersCount = (notification: Notification) => {
        if (notification.assignedTo === "all") return mockUsers.length
        return notification.assignedTo.length
    }

    const getViewedUsersCount = (notification: Notification) => {
        return notification.viewedBy.length
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

    // Filtra notifiche in base alla ricerca e filtri
    const filteredNotifications = notifications.filter(notification => {
        const matchesSearch =
            notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.type.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesType = filterType === "all" || notification.type === filterType
        const matchesStatus = filterStatus === "all" ||
            (filterStatus === "read" && notification.read) ||
            (filterStatus === "unread" && !notification.read)

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
                comparison = a.timestamp.getTime() - b.timestamp.getTime()
                break
            case "title":
                comparison = a.title.localeCompare(b.title)
                break
            case "type":
                comparison = a.type.localeCompare(b.type)
                break
            case "views":
                comparison = getViewedUsersCount(a) - getViewedUsersCount(b)
                break
            case "status":
                comparison = (a.read ? 1 : 0) - (b.read ? 1 : 0)
                break
        }

        return sortDirection === "asc" ? comparison : -comparison
    })

    // Paginazione
    const totalPages = Math.ceil(sortedNotifications.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedNotifications = sortedNotifications.slice(startIndex, endIndex)

    const unreadCount = notifications.filter(n => !n.read).length

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
            read: notification.read,
            assignToAll: notification.assignedTo === "all",
            selectedUsers: notification.assignedTo === "all" ? [] : notification.assignedTo
        })
    }

    const handleViewClick = (notification: Notification) => {
        setViewingNotification(notification)
    }

    const handleToggleUser = (userId: string) => {
        const isSelected = notificationForm.selectedUsers.includes(userId)
        if (isSelected) {
            setNotificationForm({
                ...notificationForm,
                selectedUsers: notificationForm.selectedUsers.filter(id => id !== userId)
            })
        } else {
            setNotificationForm({
                ...notificationForm,
                selectedUsers: [...notificationForm.selectedUsers, userId]
            })
        }
    }

    const handleSave = () => {
        if (!notificationForm.title.trim() || !notificationForm.message.trim()) {
            toast.error("Titolo e messaggio sono obbligatori")
            return
        }

        if (!notificationForm.assignToAll && notificationForm.selectedUsers.length === 0) {
            toast.error("Devi selezionare almeno un utente o assegnare a tutti")
            return
        }

        if (dialogMode === "create") {
            const newNotification: Notification = {
                id: Math.max(...notifications.map(n => n.id), 0) + 1,
                type: notificationForm.type,
                title: notificationForm.title.trim(),
                message: notificationForm.message.trim(),
                timestamp: new Date(),
                read: notificationForm.read,
                icon: notificationForm.icon.trim() || undefined,
                actionUrl: notificationForm.actionUrl.trim() || undefined,
                assignedTo: notificationForm.assignToAll ? "all" : notificationForm.selectedUsers,
                viewedBy: []
            }
            setNotifications([newNotification, ...notifications])
            toast.success("Notifica creata con successo")
        } else if (dialogMode === "edit" && editingNotification) {
            setNotifications(notifications.map(notification =>
                notification.id === editingNotification.id
                    ? {
                        ...notification,
                        type: notificationForm.type,
                        title: notificationForm.title.trim(),
                        message: notificationForm.message.trim(),
                        icon: notificationForm.icon.trim() || undefined,
                        actionUrl: notificationForm.actionUrl.trim() || undefined,
                        read: notificationForm.read,
                        assignedTo: notificationForm.assignToAll ? "all" : notificationForm.selectedUsers
                    }
                    : notification
            ))
            toast.success("Notifica modificata con successo")
        }

        setDialogMode(null)
        setEditingNotification(null)
    }

    const handleDeleteNotification = (notificationId: number, notificationTitle: string) => {
        if (confirm(`Sei sicuro di voler eliminare la notifica "${notificationTitle}"?`)) {
            setNotifications(notifications.filter(notification => notification.id !== notificationId))
            toast.success("Notifica eliminata con successo")
        }
    }

    const handleToggleRead = (notificationId: number) => {
        setNotifications(notifications.map(notification =>
            notification.id === notificationId
                ? { ...notification, read: !notification.read }
                : notification
        ))
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
                                            {mockUsers.map((user) => (
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
                                                Nessuna notifica trovata
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
                                                        {notification.read ? (
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
                                Nessuna notifica trovata
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
                                                    {notification.read ? (
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
                                    Assegna a tutti gli utenti ({mockUsers.length})
                                </Label>
                            </div>

                            {!notificationForm.assignToAll && (
                                <div className="space-y-2">
                                    <Label className="text-sm text-muted-foreground">
                                        Seleziona utenti specifici ({notificationForm.selectedUsers.length} selezionati)
                                    </Label>
                                    <div className="border rounded-lg p-3 max-h-[250px] overflow-y-auto space-y-2">
                                        {mockUsers.map((user) => (
                                            <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
                                                <Checkbox
                                                    id={`user-${user.id}`}
                                                    checked={notificationForm.selectedUsers.includes(user.id)}
                                                    onCheckedChange={() => handleToggleUser(user.id)}
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
                                                            Visualizzato: {formatDate(view.viewedAt)}
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
                            {viewingNotification.assignedTo === "all" && viewingNotification.viewedBy.length < mockUsers.length && (
                                <div className="space-y-2">
                                    <Label>Utenti che non hanno ancora visualizzato ({mockUsers.length - viewingNotification.viewedBy.length})</Label>
                                    <div className="border rounded-lg divide-y max-h-[200px] overflow-y-auto">
                                        {mockUsers
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
