import {Event} from "@/api/event/event";
import {ArrowRight, BadgeCheck, Calendar, Clock, ExternalLink, MapPin, PencilLine} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {formatDateLong, formatTimeShort} from "@/utils/datetime_utils";

interface NextEventSectionProps {
    nextEvent: Event
}

export default function NextEventSection({nextEvent}: NextEventSectionProps) {
    return (
        <section
            className="h-full overflow-hidden border-border/60 rounded-[var(--radius)] border bg-card text-card-foreground shadow-sm">
            <div
                className="drag-handle absolute right-2 top-2 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs text-muted-foreground bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 cursor-move">
                ⠿ Trascina
            </div>
            <div className="p-10 md:p-10 border-b">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Prossimo evento</p>
                        <h2 className="mt-1 text-xl md:text-2xl font-semibold truncate">{nextEvent.title}</h2>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                            <div className="inline-flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary"/>
                                <span>{formatDateLong(nextEvent?.datetime)}</span>
                            </div>
                            <div className="inline-flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary"/>
                                <span>{nextEvent.location_label}</span>
                            </div>
                            <div className="inline-flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary"/>
                                <span>Ritrovo ore {formatTimeShort(nextEvent?.datetime)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">

                        {nextEvent.is_registered &&
                            <span
                                className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                      <BadgeCheck className="h-3.5 w-3.5"/> Iscrizione confermata
                    </span>
                        }
                        <div className="hidden sm:flex gap-2">
                            <Link href={`/events/${nextEvent.id}`}>
                                <Button size="sm" className="gap-1"><ExternalLink
                                    className="h-4 w-4"/> Dettagli</Button>
                            </Link>
{/*                            <Link href="/events/1">
                                <Button size="sm" variant="outline" className="gap-1">
                                    <PencilLine className="h-4 w-4"/> Modifica iscrizione
                                </Button>
                            </Link>*/}
                        </div>
                    </div>
                </div>
            </div>

            {/* Map placeholder */}
            <div className="p-5 md:p-6">
                <div className="relative h-96 md:h-96 w-full overflow-hidden rounded-lg border bg-muted">
                    <iframe src="https://connect.garmin.com/modern/course/embed/403594028"
                            width="100%" height="100%"
                            title='Percorso integrato' frameBorder="0"/>

                    <div
                        className="pointer-events-none absolute inset-0 grid grid-cols-12 opacity-40 [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:20px_20px]">

                    </div>
                    <div
                        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-card/90 px-2.5 py-1.5 text-xs shadow">
                        <MapPin className="h-3.5 w-3.5 text-primary"/>
                        <span>Area di partenza</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <span className="text-xs text-muted-foreground"></span>
                        <Link href={nextEvent.location_url} className="text-xs text-primary inline-flex items-center gap-1">
                            Apri mappa <ArrowRight className="h-3.5 w-3.5"/>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 sm:hidden flex gap-2">
                    <Link href={`/events/${nextEvent.id}`} className="flex-1">
                        <Button className="w-full gap-1"><ExternalLink className="h-4 w-4"/> Visualizza
                            dettagli</Button>
                    </Link>
   {/*                 <Link href="/events/1" className="flex-1">
                        <Button variant="outline" className="w-full gap-1"><PencilLine
                            className="h-4 w-4"/> Modifica</Button>
                    </Link>*/}
                </div>
            </div>
        </section>

    )
}
