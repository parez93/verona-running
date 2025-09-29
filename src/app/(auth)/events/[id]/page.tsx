/*
"use client";
*/

import {Calendar, MapPin} from "lucide-react";
import Link from "next/link";
import * as React from "react";
/*
import {useEffect, useState} from "react";
*/
import {
    createEventRegistrationAction,
    deleteEventRegistrationAction,
    fetchEventByIdAction
} from "@/app/(auth)/events/actions";
import {Event} from "@/api/event/event";
/*import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {Checkbox} from "@/components/ui/checkbox";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/sonner";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/constants/routes";
import {formatDateLong, formatTimeShort, timeRemaining} from "@/utils/datetime_utils";*/
import {CACHE_KEY, getCached} from "@/lib/cache";
import EventRegistration from "@/app/(auth)/events/[id]/EventRegistration"; // per React.use


interface EventDetailPageProps {
    params: { id: string }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { id } = await params;

    // prova a leggere dalla cache globale
    let event: Event | undefined = getCached(CACHE_KEY.events())?.find((e: { id: number; }) => e.id.toString() === id);

    // se non presente nella cache, fetch dal server
    if (!event) {
        const data = await fetchEventByIdAction(String(id));
        event = data.items[0];
    }

/*

    const {id} = React.use(params);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const [saving, setSaving] = useState(false); // stato per il salvataggio
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await fetchEventByIdAction(id);
                setEvent(data.items[0]);
                setAccepted(data.items[0].is_registered)
                console.log(data);
            } catch (err) {
                console.error("Error fetching event", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleSave = async () => {
        console.log('handleSave registraytion')
        if (!accepted) toast.error("Terms and conditions don't accepted!");

        setSaving(true);
        setMessage(null);

        try {
            const saved = await createEventRegistrationAction(Number(id), accepted);
            setMessage("✅ Event registration successfully!");
            router.push(ROUTES.events());
        } catch (err: any) {
            console.error("Error event registration:", err);
            toast.error("Error event registration", {description: err.message});
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        console.log('handleDelete registration')
        if (!accepted) toast.error("Terms and conditions don't accepted!");

        setSaving(true);
        setMessage(null);

        try {
            const saved = await deleteEventRegistrationAction(Number(id));
            setMessage("✅ Undo event registration successfully!");
            router.push(ROUTES.events());
        } catch (err: any) {
            console.error("Error undo event registration:", err);
            toast.error("Error undo event registration", {description: err.message});
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <p>Loading...</p>;
    if (!event) return <p>Evento non trovato</p>;
*/

    return (
            <EventRegistration event={event} />
    );

/*    return (
        <div className="min-h-dvh">
            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/!* Left: Media / Poster *!/}
                    <section>
                        <div
                            className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-[#d6d7df] via-[#f0f1f5] to-[#dfe3ea] border border-border overflow-hidden shadow-sm"
                            aria-label="Event cover image placeholder">
                            {/!* Countdown mock overlay *!/}
                            <div className="absolute m-4 md:m-6 inline-flex gap-2 md:gap-3">
                                {timeRemaining(event?.datetime).map((n) => (
                                    <div key={n}
                                         className="rounded-lg bg-white/80 backdrop-blur border border-border px-3 md:px-4 py-1.5 md:py-2 text-lg md:text-2xl font-semibold text-foreground shadow-sm">
                                        {n}
                                    </div>
                                ))}
                            </div>

                            <img
                                src={event?.img}
                                alt={event?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </section>

                    {/!* Right: Title + Meta *!/}
                    <section className="space-y-4">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground line-clamp-4 break-all">
                            {event?.title}
                        </h1>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-foreground/80">
                                <Calendar className="h-4 w-4 text-primary"/>
                                <span>{formatDateLong(event?.datetime)}, {formatTimeShort(event?.datetime)}</span>
                                {/!*                               <Link href="#" className="inline-flex items-center gap-1 text-primary">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </Link>*!/}
                            </div>
                            <div className="flex items-center gap-2 text-foreground/80">
                                <MapPin className="h-4 w-4 text-primary"/>
                                <Link href={event?.location_url}
                                      className="inline-flex items-center gap-1 text-primary">
                                <span>
                                    {event?.location_label}
                                </span>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
                {/!*

                 Hosts
                <div className="mt-8 md:mt-10">
                    <h2 className="text-base font-semibold text-foreground mb-4">Hosts</h2>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#e9d5ff] to-[#dbeafe] border border-border" />
                        <div className="text-sm">Alessia</div>
                    </div>
                </div>
*!/}
                {/!*

                 Hosted by
                <div className="mt-8">
                    <h2 className="text-base font-semibold text-foreground mb-3">Hosted by</h2>
                    <div className="rounded-xl border bg-card p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground grid place-items-center font-semibold">CR</div>
                            <div className="min-w-0">
                                <p className="font-medium truncate">Cavana Run Club</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Users className="h-4 w-4" /> 828 members
                                </p>
                            </div>
                        </div>
                        <Link href="#" className="text-sm text-primary hover:underline shrink-0">Pagina</Link>
                    </div>
                </div>
*!/}

                {/!* About *!/}
                <div className="mt-8 md:mt-10">
                    <h2 className="text-base font-semibold text-foreground mb-3">About</h2>
                    <div className="prose prose-sm max-w-none text-foreground">
                        <article className="prose">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {event?.info}
                            </ReactMarkdown>
                        </article>


                        <p>
                            <Link href="https://www.misterrunning.com/it/ste-asics-cavana-run-club-trieste/"
                                  className="text-primary hover:underline break-all">
                                https://www.misterrunning.com/it/ste-asics-cavana-run-club-trieste/
                            </Link>
                        </p>

                        <p className="text-muted-foreground">
                            ATTENZIONE questo link è per iscrizione allo shoe test per ricevere il kit (fino ad
                            esaurimento scorte). A kit esauriti si può lo stesso partecipare e ricevere lo sconto
                            esclusivo.
                        </p>
                        <p className="text-foreground">Qui i dettagli</p>
                        <p className="text-foreground">
                            Che Evento! Divertimento, community e la possibilità di provare gratuitamente le nuove
                            ASICS. Ti aspettiamo!


                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>

                        </p>
                    </div>
                </div>
            </div>

            {/!* Sticky Register CTA *!/}
            <div className="fixed inset-x-0 bottom-0 z-10 pointer-events-none bg-background">
                <div className="container mx-auto px-4 pb-6 pt-6">
                    {/!*Terms & Subscribe *!/}
                    <div className="pointer-events-auto mx-auto max-w-sm">
                        <div>
                            <div className="flex items-start gap-3 mb-2">
                                <Checkbox
                                    id={`terms-${event.id}`}
                                    checked={accepted}
                                    onCheckedChange={(v) => setAccepted(Boolean(v))}
                                />
                                <label htmlFor={`terms-${event.id}`} className="text-sm select-none">
                                    Dichiaro di aver letto e accettato i
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button
                                                type="button"
                                                className="ml-1 underline text-[var(--color-link-primary)]"
                                            >
                                                Termini e condizioni
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Termini e condizioni</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-3 text-sm text-muted-foreground">
                                                <p>
                                                    Partecipando all'evento, confermi di essere in buone
                                                    condizioni fisiche e di accettare i rischi connessi
                                                    all'attività. L'organizzazione non è responsabile per
                                                    eventuali danni a cose o persone.
                                                </p>
                                                <p>
                                                    È obbligatorio l'uso del casco e il rispetto del codice
                                                    della strada. Mantieni un comportamento rispettoso verso
                                                    gli altri partecipanti e l'ambiente.
                                                </p>
                                                <p>
                                                    Trattamento dati personali in conformità al Regolamento
                                                    (UE) 2016/679 (GDPR).
                                                </p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </label>
                            </div>


                        </div>

                        <div className=" block w-full rounded-xl text-white text-center">

                            {event.is_registered ? (
                                <Button
                                    className="rounded-xl text-white text-center py-3 font-semibold shadow-lg hover:opacity-95"
                                    onClick={handleDelete}>
                                    Annulla iscrizione all'evento
                                </Button>
                            ) : (
                                <Button disabled={!accepted}
                                        className="rounded-xl text-white text-center py-3 font-semibold shadow-lg hover:opacity-95"
                                        onClick={handleSave}>
                                    Iscriviti all'evento
                                </Button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>

        </div>
    );*/
}
