export interface Notification {
    id: number
    type: "badge" | "event" | "challenge" | "leaderboard" | "achievement"
    title: string
    message: string
    timestamp: Date
    read: boolean
    deleted: boolean
    icon?: string
    actionUrl?: string
}

export const mockNotifications: Notification[] = [
    {
        id: 1,
        type: "badge",
        title: "Nuovo Badge Sbloccato! 🏆",
        message: "Complimenti! Hai sbloccato il badge 'Costante' partecipando a 5 eventi.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minuti fa
        read: false,
        deleted: false,
        icon: "🏆",
        actionUrl: "/gamification?tab=dashboard"
    },
    {
        id: 2,
        type: "event",
        title: "Nuovo Evento Disponibile",
        message: "Verona Night Run 2024 è ora disponibile per la registrazione! Non perdere questa occasione.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 ore fa
        read: false,
        deleted: false,
        icon: "📅",
        actionUrl: "/"
    },
    {
        id: 3,
        type: "challenge",
        title: "Sfida Quasi Completata! 💪",
        message: "Sei a solo 1 evento dal completare la sfida 'Partecipa a 3 eventi questo mese'. Continua così!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 ore fa
        read: false,
        deleted: false,
        icon: "💪",
        actionUrl: "/gamification?tab=challenges"
    },
    {
        id: 4,
        type: "leaderboard",
        title: "Nuovo Podio! 🥈",
        message: "Complimenti! Sei salito al 2° posto nella classifica mensile. Continua così!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 ore fa
        read: true,
        deleted: false,
        icon: "🥈",
        actionUrl: "/gamification?tab=leaderboard"
    },
    {
        id: 5,
        type: "achievement",
        title: "Traguardo Raggiunto! ⭐",
        message: "Hai raggiunto il livello 3! Ora sei un 'Runner Avanzato'.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 giorno fa
        read: true,
        deleted: false,
        icon: "⭐",
        actionUrl: "/gamification"
    },
    {
        id: 6,
        type: "event",
        title: "Promemoria Evento",
        message: "La Maratona di Verona inizia tra 3 giorni. Preparati al meglio!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 giorni fa
        read: true,
        deleted: false,
        icon: "⏰",
        actionUrl: "/"
    },
    {
        id: 7,
        type: "badge",
        title: "Badge Sbloccato: Top 3 🥇",
        message: "Sei arrivato tra i primi 3 alla Verona City Run! Grande prestazione!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 giorni fa
        read: true,
        deleted: false,
        icon: "🥇",
        actionUrl: "/gamification?tab=dashboard"
    },
    {
        id: 8,
        type: "challenge",
        title: "Sfida Completata! ✅",
        message: "Hai completato la sfida 'Completa una gara >10 km'. +500 punti guadagnati!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 giorni fa
        read: true,
        deleted: false,
        icon: "✅",
        actionUrl: "/gamification?tab=challenges"
    },
    {
        id: 9,
        type: "leaderboard",
        title: "Classifica Aggiornata",
        message: "La classifica mensile è stata aggiornata. Controlla la tua posizione!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 giorni fa
        read: true,
        deleted: false,
        icon: "📊",
        actionUrl: "/gamification?tab=leaderboard"
    },
    {
        id: 10,
        type: "event",
        title: "Evento Completato",
        message: "Grazie per aver partecipato alla Verona Half Marathon! I tuoi punti sono stati aggiornati.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 giorni fa
        read: true,
        deleted: false,
        icon: "✨",
        actionUrl: "/"
    }
]

// Helper per ottenere il conteggio delle notifiche non lette
export function getUnreadCount(notifications: Notification[]): number {
    return notifications.filter(n => !n.read).length
}

// Helper per formattare il timestamp
export function formatNotificationTime(timestamp: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Ora"
    if (diffMins < 60) return `${diffMins}m fa`
    if (diffHours < 24) return `${diffHours}h fa`
    if (diffDays === 1) return "Ieri"
    if (diffDays < 7) return `${diffDays}g fa`

    return timestamp.toLocaleDateString("it-IT", {
        day: "numeric",
        month: "short"
    })
}
