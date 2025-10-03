import {Event} from "@/api/event/event";
import Link from "next/link";
import {formatDateLong, formatTimeShort} from "@/utils/datetime_utils";
import {Badge} from "@/components/ui/badge";
import {
    ArrowRight,
    BadgeCheck,
    Calendar,
    Clock,
    ExternalLink,
    Heart,
    MapPin,
    PencilLine,
    Share,
    Share2, ShareIcon
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Share_Tech} from "next/dist/compiled/@next/font/dist/google";

export default function EventCard_old({event}: { event: Event }){

    return (
        <Link href={`/events/${event.id}`} className="sm:inline-flex">
            <div className="flex flex-col sm:flex-row w-full max-w-xl bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Event Image */}
                <div className="w-full sm:w-32 h-40 sm:h-40 flex-shrink-0">
                    <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Event Info */}
                <div className="flex flex-col px-4 py-3">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 break-all">
                        {event.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {formatDateLong(new Date(event.datetime))}, {formatTimeShort(event?.datetime)}
                    </p>

                    {event.is_registered && (
                        <Badge
                            variant="default"
                            className="mt-7"
                        >
                            Registrato
                        </Badge>
                    )}
                </div>
            </div>

        </Link>
    );


/*    return <section className="rounded-[var(--radius)] border bg-card text-card-foreground shadow-sm">
        <div className="p-5 md:p-6 border-b">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Prossimo evento</p>
                    <h2 className="mt-1 text-xl md:text-2xl font-semibold truncate">{event.title}</h2>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{formatDateLong(new Date(event.datetime))}</span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{event.location_label}</span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>Ritrovo ore {formatTimeShort(event?.datetime)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    {event.is_registered && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                      <BadgeCheck className="h-3.5 w-3.5" /> Registrato
                    </span>
                    )}
                    <div className="hidden sm:flex gap-2">
                        <Link href="/events/1">
                            <Button size="sm" className="gap-1"><ExternalLink className="h-4 w-4" /> Dettagli</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/!* Map placeholder *!/}
        <div className="p-5 md:p-6">
            <div className="relative h-48 md:h-56 w-full overflow-hidden rounded-lg border bg-muted">
                <div className="pointer-events-none absolute inset-0 grid grid-cols-12 opacity-40 [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="mt-4 sm:hidden flex gap-12">
                <Link href={`/events/${event.id}`} className="flex-1">
                    <Button className="w-full gap-1"><ExternalLink className="h-4 w-4" /> Visualizza dettagli</Button>
                </Link>
{/!*                <Link href="/events/1" className="flex-1">
                    <Button variant="outline" className=" gap-1"><Heart className="h-4 w-4" /></Button>
                    <Button variant="outline" className=" gap-1"><Share2 className="h-4 w-4" /></Button>
                </Link>*!/}
            </div>
        </div>
    </section>*/


};
