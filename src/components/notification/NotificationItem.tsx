"use client"

import { useRouter } from "next/navigation"
import { Trophy, Calendar, Target, TrendingUp, Award } from "lucide-react"

interface NotificationItemProps {
    notification: any
    onMarkAsRead: (id: number) => void
    onClose: () => void
}

export function NotificationItem({ notification, onMarkAsRead, onClose }: NotificationItemProps) {
    const router = useRouter()

    const handleClick = async () => {
        if (!notification.isRead) {
            await onMarkAsRead(notification.id)
        }

        if (notification.actionUrl) {
            router.push(notification.actionUrl)
            onClose()
        }
    }

    const getIcon = () => {
        switch (notification.type) {
            case "badge":
            case "achievement":
                return <Trophy className="h-5 w-5 text-[#e67e22]" />
            case "event":
                return <Calendar className="h-5 w-5 text-[#1e3a5f]" />
            case "challenge":
                return <Target className="h-5 w-5 text-[#e67e22]" />
            case "leaderboard":
                return <TrendingUp className="h-5 w-5 text-[#1e3a5f]" />
            default:
                return <Award className="h-5 w-5 text-[#e67e22]" />
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`
        flex gap-3 p-3 rounded-lg cursor-pointer transition-all
        hover:bg-muted/50
        ${!notification.isRead ? "bg-accent/30" : ""}
      `}
        >
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
                <div className={`
          p-2 rounded-full
          ${notification.type === "badge" || notification.type === "achievement"
                    ? "bg-[#e67e22]/10"
                    : "bg-[#1e3a5f]/10"}
        `}>
                    {getIcon()}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`text-sm font-semibold line-clamp-1 ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                    </h4>
                    {!notification.isRead && (
                        <div className="flex-shrink-0 w-2 h-2 bg-[#e67e22] rounded-full mt-1" />
                    )}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                    {notification.message}
                </p>

                <span className="text-xs text-muted-foreground/70">
          {new Date(notification.createdAt).toLocaleString("it-IT")}
        </span>
            </div>
        </div>
    )
}
