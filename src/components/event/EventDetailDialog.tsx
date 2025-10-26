"use client";

import {EventWithRegistration} from "@/types/models/event";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {CalendarDays, ExternalLink, MapPin, X} from "lucide-react";
import {format} from "date-fns";
import {it} from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import * as React from "react";
import {useState} from "react";
import Link from "next/link";
import {ROUTES} from "@/lib/kRoutes";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {deleteRegistrationAct, makeRegistrationAct} from "@/app/[locale]/(private)/event/actions";
import {useTranslations} from "next-intl";

interface EventDetailDialogProps {
    event: EventWithRegistration | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EventDetailDialog({event, open, onOpenChange}: EventDetailDialogProps) {
    const t = useTranslations("event.eventDetailDialog");
    const [saving, setSaving] = useState(false); // stato per il salvataggio
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    if (!event) return null

    const eventDate = new Date(event.datetime)

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            await makeRegistrationAct(event.id);
            setMessage(t("registrationSuccess"));
            onOpenChange(false);
            router.refresh();
        } catch (err: any) {
            console.error("Error event registration:", err);
            toast.error(t("registrationError"), {description: err.message});
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setSaving(true);
        setMessage(null);

        try {
            await deleteRegistrationAct(event.id);
            setMessage(t("undoRegistrationSuccess"));
            onOpenChange(false);
            router.refresh();
        } catch (err: any) {
            console.error("Error undo event registration:", err);
            toast.error(t("undoRegistrationError"), {description: err.message})
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden" showCloseButton={false}>
                <div className="relative -mx-6 -mt-6 mb-4">
                    <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                    />
                    {event.is_registered && (
                        <Badge className="absolute top-6 right-10 bg-green-600 hover:bg-green-700">
                            {t("registered")}
                        </Badge>
                    )}
                </div>

                <DialogHeader>
                    <DialogTitle className="text-2xl line-clamp-2 break-words">{event.title}</DialogTitle>
                    <DialogDescription className="sr-only">
                        {t("eventDetails")}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 overflow-x-hidden">
                    {/* Date and Location */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <CalendarDays className="h-5 w-5 flex-shrink-0"/>
                            <div>
                                <time dateTime={event.datetime} className="font-medium text-foreground">
                                    {format(eventDate, "EEEE d MMMM yyyy", {locale: it})}
                                </time>
                                <p className="text-sm">
                                    Ore {format(eventDate, "HH:mm", {locale: it})}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-muted-foreground">
                            <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5"/>
                            <div className="flex-1">
                                <p className="font-medium text-foreground">{event.location_label}</p>
                                <a
                                    href={event.location_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm inline-flex items-center gap-1 hover:underline text-primary"
                                >
                                    {t("openInMaps")}
                                    <ExternalLink className="h-3 w-3"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Description with Markdown */}
                    <div>
                        <h3 className="font-semibold mb-2">{t("description")}</h3>
                        <div className="markdown-content text-muted-foreground leading-relaxed line-clamp-5">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {event?.info}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                        {event.is_registered ? (
                            <Button variant="outline" className="flex-1" onClick={handleDelete}>
                                {t("cancelRegistration")}
                            </Button>
                        ) : (
                            <Button className="flex-1"
                                    onClick={handleSave}>
                                {t("registerEvent")}
                            </Button>
                        )}
                        <Button variant="outline" asChild>
                            <Link href={`${ROUTES.event()}/${event.id}`}>
                                {t("moreInfo")}
                                <ExternalLink className="h-4 w-4 ml-2"/>
                            </Link>
                        </Button>
                    </div>
                </div>

                <DialogClose asChild>
                    <button
                        className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 transition-all duration-200"
                        aria-label="Close"
                    >
                        <X size={12}/>
                    </button>
                </DialogClose>

            </DialogContent>
        </Dialog>
    )
}
