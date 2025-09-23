"use client";

import {useEffect, useState} from "react";
import {Card, CardHeader} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {fetchEventsAction} from "@/app/(auth)/events/actions";
import {Event} from "@/api/event/event";
import EventCard from "@/components/event/EventCard";
import EventPast from "@/components/event/EventPast";


export default function EventsPage() {

    const [events, setEvents] = useState<Event[] | []>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchEventsAction()
                console.log(data)
                setEvents(data.items);
            } catch (err) {
                console.error("Error fetching account", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const byDateAsc = (a: Event, b: Event) =>
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
    const byDateDesc = (a: Event, b: Event) =>
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime();

    const upcoming = events
        .filter((e) => new Date(e.datetime).getTime() >= today.getTime())
        .sort(byDateAsc);
    const past = events
        .filter((e) => new Date(e.datetime).getTime() < today.getTime())
        .sort(byDateDesc);

        return (
            <div className="space-y-6">
                <Card className="p-0">
                    <Tabs defaultValue="upcoming" className="space-y-6">
                        <CardHeader className="p-0">

                            <TabsList className="grid w-full grid-cols-4 h-12 bg-white">
                                <TabsTrigger value="upcoming" className="
          flex items-center justify-center space-x-2
          rounded-none
          border-b-2 border-transparent
          bg-white
          text-gray-600
          data-[state=active]:text-purple-700
          data-[state=active]:border-b-purple-700
          data-[state=active]:shadow-white
          data-[state=active]:bg-white
        ">Prossimi eventi</TabsTrigger>
                                <TabsTrigger value="past" className="
          flex items-center justify-center space-x-2
          rounded-none
          border-b-2 border-transparent
          bg-white
          text-gray-600
          data-[state=active]:text-purple-700
          data-[state=active]:border-b-purple-700
          data-[state=active]:shadow-white
          data-[state=active]:bg-white
        ">Eventi passati</TabsTrigger>
                            </TabsList>
                        </CardHeader>
                        <TabsContent value="upcoming" className="pl-7 pr-7">
                            {upcoming.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Nessun evento in programma.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                                    {upcoming.map((ev) => (
                                        <EventCard key={ev.id} event={ev}/>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="past" className="pl-7 pr-7 pb-7">
                            {past.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Nessun evento passato.</p>
                            ) : (
                                <EventPast events={past}/>
                            )}
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        );

    /*
        return (
            <div className="min-h-dvh">
                {/!* Page header *!/}
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">La tua dashboard</h1>
                        <p className="text-sm text-muted-foreground">Panoramica rapida degli eventi, statistiche e notifiche.</p>
                    </div>
                </div>

                <main className="container mx-auto px-4 pb-16 md:pb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                        {/!* Left column: Next event + Enrolled events *!/}
                        <div className="space-y-6 xl:col-span-2">
                            {upcoming.map((ev) => (
                                <EventCard key={ev.id} event={ev}/>
                            ))}

                        </div>
                    </div>
                </main>
            </div>
        );
    */


/*    return (
        <div>
            {/!*Page header *!/}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Prossimi eventi</h1>
                    <p className="text-sm text-muted-foreground">Panoramica rapida degli eventi.</p>
                </div>
            </div>

            {upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nessun evento in programma.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                    {upcoming.map((ev) => (
                        <EventCard key={ev.id} event={ev}/>
                    ))}
                </div>
            )}

        </div>
    );*/
}
