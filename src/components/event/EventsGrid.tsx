"use client"

import {Event, EventWithRegistration} from "@/api/event/event";
import {EventCard} from "@/components/event/EventCard";
import {EventDetailDialog} from "@/components/event/EventDetailDialog";
import {useState} from "react";


interface EventsGridProps {
    events: EventWithRegistration[]
}

export function EventsGrid({ events }: { events: EventWithRegistration[] }) {

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    const handleEventClick = (event: Event) => {
        setSelectedEvent(event)
        setIsDialogOpen(true)
    }

    return (
        <>
            {/* Events Grid */}
            <div className="container mx-auto px-4 py-8">
                {events.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">
                            Nessun evento trovato
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 text-sm text-muted-foreground">
                            {events.length} {events.length === 1 ? "evento trovato" : "eventi trovati"}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {events.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onClick={() => handleEventClick(event)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Event Detail Dialog */}
            <EventDetailDialog
                event={selectedEvent}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </>
    )
}
