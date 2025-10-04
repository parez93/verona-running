"use client";

import {Calendar, MapPin} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {useState} from "react";
import {
    createEventRegistrationAction,
    deleteEventRegistrationAction,
} from "@/app/(auth)/events/actions";
import {Event} from "@/api/event/event";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {Checkbox} from "@/components/ui/checkbox";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/sonner";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/constants/routes";
import {formatDateLong, formatTimeShort, timeRemaining} from "@/utils/datetime_utils";

export default function EventRegistration({ event }: { event: Event }) {

    const [saving, setSaving] = useState(false); // stato per il salvataggio
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();


    const handleSave = async () => {
        console.log('handleSave registration')

        setSaving(true);
        setMessage(null);

        try {
            const saved = await createEventRegistrationAction(event.id);
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

        setSaving(true);
        setMessage(null);

        try {
            const saved = await deleteEventRegistrationAction(event.id);
            setMessage("✅ Undo event registration successfully!");
            router.push(ROUTES.events());
        } catch (err: any) {
            console.error("Error undo event registration:", err);
            toast.error("Error undo event registration", {description: err.message})
        } finally {
            setSaving(false);
        }
    };


    return (
        <div className="min-h-dvh">
            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left: Media / Poster */}
                    <section>
                        <div
                            className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-[#d6d7df] via-[#f0f1f5] to-[#dfe3ea] border border-border overflow-hidden shadow-sm"
                            aria-label="Event cover image placeholder">
                            {/* Countdown mock overlay */}
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

                    {/* Right: Title + Meta */}
                    <section className="space-y-4">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground line-clamp-4 break-all">
                            {event?.title}
                        </h1>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-foreground/80">
                                <Calendar className="h-4 w-4 text-primary"/>
                                <span>{formatDateLong(event?.datetime)}, {formatTimeShort(event?.datetime)}</span>
                                {/*                               <Link href="#" className="inline-flex items-center gap-1 text-primary">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </Link>*/}
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
                {/*

                 Hosts
                <div className="mt-8 md:mt-10">
                    <h2 className="text-base font-semibold text-foreground mb-4">Hosts</h2>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#e9d5ff] to-[#dbeafe] border border-border" />
                        <div className="text-sm">Alessia</div>
                    </div>
                </div>
*/}
                {/*

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
*/}

                {/* About */}
                <div className="mt-8 md:mt-10">
                    <h2 className="text-base font-semibold text-foreground mb-3">About</h2>
                    <div className="prose prose-sm max-w-none text-foreground">
                        <div className="markdown-content text-muted-foreground leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {event?.info}
                            </ReactMarkdown>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>

            {/* Sticky Register CTA */}
            <div className="fixed inset-x-0 bottom-0 z-10 pointer-events-none bg-background">
                <div className="container mx-auto px-4 pb-6 pt-6">
                    {/*Terms & Subscribe */}
                    <div className="pointer-events-auto mx-auto max-w-sm">
                        <div className=" block w-full rounded-xl text-white text-center">

                            {event.is_registered ? (
                                <Button
                                    className="rounded-xl text-white text-center py-3 font-semibold shadow-lg hover:opacity-95"
                                    onClick={handleDelete}>
                                    Annulla iscrizione all'evento
                                </Button>
                            ) : (
                                <Button
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
    );
}
