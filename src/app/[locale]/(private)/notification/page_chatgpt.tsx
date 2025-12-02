// app/notifications/page_chatgpt.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationItem } from "@/components/notification/NotificationItem"
import { Bell, Check, Trash2 } from "lucide-react"

// NOTE: replace with actual logic to get current user's psnId (from Supabase auth or server props)
const PSN_ID_PLACEHOLDER = "REPLACE_WITH_USER_UUID"

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
    const [loading, setLoading] = useState(true)

    // Load notifications for the current user
    useEffect(() => {
        const psnId = PSN_ID_PLACEHOLDER
        if (!psnId) {
            console.warn("PSN ID missing — replace PSN_ID_PLACEHOLDER with real user id or obtain from auth")
            setLoading(false)
            return
        }

        let mounted = true
        const load = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/notifications?psnId=${psnId}`)
                const json = await res.json()
                if (!mounted) return
                // API returns items mapped with camelCase: { id, type, title, message, actionUrl, isRead, createdAt, ... }
                setNotifications(json.data ?? [])
            } catch (err) {
                console.error("Failed to load notifications", err)
            } finally {
                if (mounted) setLoading(false)
            }
        }

        load()
        return () => { mounted = false }
    }, [])

    // Mark single notification read (optimistic)
    const markAsRead = async (id: number) => {
        const psnId = PSN_ID_PLACEHOLDER
        // optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
        try {
            await fetch(`/api/notifications/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ psnId })
            })
        } catch (err) {
            console.error("Failed to mark read", err)
            // rollback on error
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: false } : n))
        }
    }

    // Mark all as read (sequential to avoid hammering)
    const handleMarkAllAsRead = async () => {
        const unread = notifications.filter(n => !n.isRead)
        for (const n of unread) {
            // use markAsRead which does optimistic update
            // eslint-disable-next-line no-await-in-loop
            await markAsRead(n.id)
        }
    }

    const handleClearAll = () => setNotifications([])

    const unreadCount = notifications.filter(n => !n.isRead).length
    const unreadNotifications = notifications.filter(n => !n.isRead)
    const displayedNotifications = activeTab === "all" ? notifications : unreadNotifications

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
                                <Bell className="h-8 w-8 text-[#e67e22]" />
                                Notifiche
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                {unreadCount > 0
                                    ? `Hai ${unreadCount} ${unreadCount === 1 ? "notifica non letta" : "notifiche non lette"}`
                                    : "Tutte le notifiche sono state lette"}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <Button variant="outline" onClick={handleMarkAllAsRead} className="gap-2">
                                    <Check className="h-4 w-4" />
                                    <span className="hidden sm:inline">Segna tutto letto</span>
                                </Button>
                            )}
                            {notifications.length > 0 && (
                                <Button variant="outline" onClick={handleClearAll} className="gap-2 text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="hidden sm:inline">Cancella tutto</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "unread")} className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                        <TabsTrigger value="all" className="gap-2">
                            Tutte
                            {notifications.length > 0 && (
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{notifications.length}</span>
                            )}
                        </TabsTrigger>

                        <TabsTrigger value="unread" className="gap-2">
                            Non lette
                            {unreadCount > 0 && (
                                <span className="text-xs bg-[#e67e22] text-white px-2 py-0.5 rounded-full">{unreadCount}</span>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                        {loading ? (
                            <Card className="p-8 text-center">Caricamento...</Card>
                        ) : displayedNotifications.length === 0 ? (
                            <Card className="p-12">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <Bell className="h-16 w-16 text-muted-foreground/50 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Nessuna notifica</h3>
                                    <p className="text-sm text-muted-foreground max-w-md">
                                        Non hai ancora ricevuto notifiche. Ti avviseremo quando ci saranno aggiornamenti su eventi, badge o sfide.
                                    </p>
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-2">
                                {displayedNotifications.map((notification) => (
                                    <Card key={notification.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <NotificationItem
                                            notification={{
                                                // keep the same shape expected by your NotificationItem (we'll map names)
                                                id: notification.id,
                                                type: notification.type,
                                                title: notification.title,
                                                message: notification.message,
                                                // NotificationItem expects `read` in original file; our NotificationItem earlier update uses isRead
                                                // If your NotificationItem still expects `read`, it will work because we preserve both below
                                                read: notification.isRead ?? notification.read ?? false,
                                                isRead: notification.isRead ?? notification.read ?? false,
                                                actionUrl: notification.actionUrl ?? notification.action_url ?? null,
                                                timestamp: notification.createdAt ? new Date(notification.createdAt) : (notification.timestamp ? new Date(notification.timestamp) : new Date())
                                            }}
                                            onMarkAsRead={markAsRead}
                                            onClose={() => {}}
                                        />
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="unread" className="mt-0">
                        {loading ? (
                            <Card className="p-8 text-center">Caricamento...</Card>
                        ) : displayedNotifications.length === 0 ? (
                            <Card className="p-12">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <Check className="h-16 w-16 text-green-500 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Tutto letto! 🎉</h3>
                                    <p className="text-sm text-muted-foreground max-w-md">
                                        Non hai notifiche non lette. Ottimo lavoro nel rimanere aggiornato!
                                    </p>
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-2">
                                {displayedNotifications.map((notification) => (
                                    <Card key={notification.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <NotificationItem
                                            notification={{
                                                id: notification.id,
                                                type: notification.type,
                                                title: notification.title,
                                                message: notification.message,
                                                read: notification.isRead ?? notification.read ?? false,
                                                isRead: notification.isRead ?? notification.read ?? false,
                                                actionUrl: notification.actionUrl ?? notification.action_url ?? null,
                                                timestamp: notification.createdAt ? new Date(notification.createdAt) : (notification.timestamp ? new Date(notification.timestamp) : new Date())
                                            }}
                                            onMarkAsRead={markAsRead}
                                            onClose={() => {}}
                                        />
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
