"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationItem } from "@/components/notification/NotificationItem"
import { Bell, Check, Trash2 } from "lucide-react"

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
    const [loading, setLoading] = useState(true)

    // --------------------------
    // GET list
    // --------------------------
    const fetchNotifications = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/notifications`)
            console.log(res)
            const json = await res.json()
            if (json?.data) {
                setNotifications(json.data)
            }
            console.log(json.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    // --------------------------
    // Mark single read
    // --------------------------
    const handleMarkAsRead = async (id: number) => {
        try {
            await fetch(`/api/notifications/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            })

            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, isRead: true } : n)
            )
        } catch (err) {
            console.error(err)
        }
    }

    // --------------------------
    // Mark ALL read
    // --------------------------
    const handleMarkAllAsRead = async () => {
        try {
            await fetch(`/api/notifications`, { method: "PATCH" })

            setNotifications(prev =>
                prev.map(n => ({ ...n, isRead: true }))
            )
        } catch (err) {
            console.error(err)
        }
    }

    // --------------------------
    // Clear-all (UI only)
    // --------------------------
    const handleClearAll = () => {
        setNotifications([])
    }

    const unreadCount = notifications.filter(n => !n.isRead).length
    const unreadNotifications = notifications.filter(n => !n.isRead)

    const displayedNotifications =
        activeTab === "all" ? notifications : unreadNotifications

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

                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={handleMarkAllAsRead}
                                    className="gap-2"
                                >
                                    <Check className="h-4 w-4" />
                                    <span className="hidden sm:inline">Segna tutto letto</span>
                                </Button>
                            )}
                            {notifications.length > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={handleClearAll}
                                    className="gap-2 text-destructive hover:text-destructive"
                                >
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
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                    {notifications.length}
                                </span>
                            )}
                        </TabsTrigger>

                        <TabsTrigger value="unread" className="gap-2">
                            Non lette
                            {unreadCount > 0 && (
                                <span className="text-xs bg-[#e67e22] text-white px-2 py-0.5 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                        {loading ? (
                            <Card className="p-12">
                                Caricamento...
                            </Card>
                        ) : displayedNotifications.length === 0 ? (
                            <Card className="p-12">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <Bell className="h-16 w-16 text-muted-foreground/50 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Nessuna notifica</h3>
                                    <p className="text-sm text-muted-foreground max-w-md">
                                        Non hai ancora ricevuto notifiche.
                                    </p>
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-2">
                                {displayedNotifications.map((notification) => (
                                    <Card key={notification.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <NotificationItem
                                            notification={notification}
                                            onMarkAsRead={handleMarkAsRead}
                                            onClose={() => {}}
                                        />
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="unread" className="mt-0">
                        {loading ? (
                            <Card className="p-12">Caricamento...</Card>
                        ) : displayedNotifications.length === 0 ? (
                            <Card className="p-12">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <Check className="h-16 w-16 text-green-500 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Tutto letto! 🎉</h3>
                                    <p className="text-sm text-muted-foreground max-w-md">
                                        Non hai notifiche non lette.
                                    </p>
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-2">
                                {displayedNotifications.map((notification) => (
                                    <Card key={notification.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <NotificationItem
                                            notification={notification}
                                            onMarkAsRead={handleMarkAsRead}
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
