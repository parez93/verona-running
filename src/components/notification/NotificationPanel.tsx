"use client"

import {useEffect, useState} from "react"
import {Bell, Check, X} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {ScrollArea} from "@/components/ui/scroll-area"
import {NotificationItem} from "./NotificationItem"
import {useRouter} from "next/navigation"
import {ROUTES} from "@/lib/kRoutes";
import {Notification} from "@/types/models/notification";


export function NotificationPanel() {
    /*
        const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
    */
    const [open, setOpen] = useState(false)
    const router = useRouter()


    const [notifications, setNotifications] = useState<Notification[]>([])
    // --------------------------
    // GET list
    // --------------------------
    const fetchNotifications = async () => {
        try {
            const res = await fetch(`/api/notifications`)
            console.log(res)
            const json = await res.json()
            if (json?.data) {
                setNotifications(json.data)
            }
            console.log(json.data)
        } finally {
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])


    function getUnreadCount(notifications: Notification[]): number {
        return notifications.filter(n => !n.isRead).length
    }

    const unreadCount = getUnreadCount(notifications)

    const handleMarkAsRead = async (id: number) => {
        try {
            await fetch(`/api/notifications/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({})
            })

            setNotifications(prev =>
                prev.map(n => n.id === id ? {...n, isRead: true} : n)
            )
        } catch (err) {
            console.error(err)
        }
    }

    const handleMarkAllAsRead = async () => {
        try {
            await fetch(`/api/notifications`, {method: "PATCH"})

            setNotifications(prev =>
                prev.map(n => ({...n, isRead: true}))
            )
        } catch (err) {
            console.error(err)
        }
    }

    const handleClearAll = () => {
        setNotifications([])
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-accent/50"
                >
                    <Bell className="h-5 w-5"/>
                    {unreadCount > 0 && (
                        <span
                            className="absolute -top-1 -right-1 bg-[#e67e22] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">

              {unreadCount > 9 ? "9+" : unreadCount}
            </span>

                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[380px] sm:w-[420px] p-0"
                align="end"
                sideOffset={8}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        <h3 className="font-semibold text-lg">Notifiche</h3>
                        {unreadCount > 0 && (
                            <p className="text-xs text-muted-foreground">
                                {unreadCount} {unreadCount === 1 ? "non letta" : "non lette"}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleMarkAllAsRead}
                                className="text-xs"
                            >
                                <Check className="h-4 w-4 mr-1"/>
                                Segna tutto letto
                            </Button>
                        )}
                        {notifications.length > 0 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleClearAll}
                                className="h-8 w-8"
                            >
                                <X className="h-4 w-4"/>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Notifications List */}
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                        <Bell className="h-12 w-12 text-muted-foreground/50 mb-3"/>
                        <p className="text-sm text-muted-foreground text-center">
                            Nessuna notifica al momento
                        </p>
                    </div>
                ) : (
                    <ScrollArea className="h-[400px]">
                        <div className="p-2 space-y-1">
                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={handleMarkAsRead}
                                    onClose={() => setOpen(false)}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                )}

                {/* Footer */}
                {notifications.length > 0 && (
                    <div className="border-t p-3">
                        <Button
                            variant="ghost"
                            className="w-full text-sm"
                            onClick={() => {
                                router.push(ROUTES.notification())
                                setOpen(false)
                            }}
                        >
                            Vedi tutte le notifiche
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
