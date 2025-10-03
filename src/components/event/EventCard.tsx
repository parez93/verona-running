"use client"

import {Event} from "@/api/event/event";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {CalendarDays, Clock, MapPin} from "lucide-react"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import * as React from "react";
import {Button} from "@/components/ui/button";

interface EventCardProps {
    event: Event
    onClick: () => void
}

export function EventCard({ event, onClick }: EventCardProps) {
    const eventDate = new Date(event.datetime)

    return (
        <Card
            key={event.id}
            className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
            onClick={onClick}
        >
            {/* Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {event.is_registered && (
                    <Badge className="absolute top-3 right-3 bg-green-600 hover:bg-green-700">
                        Registrato
                    </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"/>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm sm:text-base flex-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="h-4 w-4 flex-shrink-0"/>
                        <time dateTime={event.datetime} className="line-clamp-1">
                            {format(eventDate, "EEEE d MMMM yyyy", {locale: it})}
                        </time>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 flex-shrink-0"/>
                        <span>Ore {format(eventDate, "HH:mm", {locale: it})}</span>
                    </div>

                    <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5"/>
                        <span className="line-clamp-2">{event.location_label}</span>
                    </div>
                </div>

                <Button className="w-full mt-auto" variant="default">
                    Scopri di più
                </Button>
            </div>
        </Card>
    )
}
