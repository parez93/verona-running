import {Event} from "@/api/event/event";
import {
    AlertTriangle,
    ArrowRight,
    BadgeCheck,
    Bell,
    Calendar,
    Clock, CloudRain,
    ExternalLink,
    MapPin,
    PencilLine
} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function NotificationSection(){
    return (
        <section className="h-full overflow-hidden border-border/60 rounded-[var(--radius)] border bg-card text-card-foreground shadow-sm">
            <div className="drag-handle absolute right-2 top-2 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs text-muted-foreground bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 cursor-move">
                ⠿ Trascina
            </div>
            <div className="p-5 md:p-6 border-b flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Notifiche e avvisi</h3>
                    <p className="text-sm text-muted-foreground mt-1">Aggiornamenti importanti sugli eventi.</p>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex">Segna come lette</Button>
            </div>
            <ul className="divide-y">
                {[
                    { type: "info" as const, icon: Bell, title: "Reminder pagamento", desc: "Completa il pagamento per la Mezza di Padova entro 72 ore.", time: "2h fa" },
                    { type: "warning" as const, icon: AlertTriangle, title: "Cambio percorso", desc: "Verona Running: deviazione di 500m per lavori in corso.", time: "Ieri" },
                    { type: "weather" as const, icon: CloudRain, title: "Meteo", desc: "Possibili piogge leggere il giorno della gara. Prepara un k-way.", time: "Questa settimana" },
                ].map((n, i) => (
                    <li key={i} className="p-5 md:p-6">
                        <div className="flex items-start gap-3">
                            <div className={
                                "mt-0.5 rounded-md p-2 " +
                                (n.type === "warning" ? "bg-red-50 text-red-600" : n.type === "weather" ? "bg-blue-50 text-blue-600" : "bg-accent text-accent-foreground")
                            }>
                                <n.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium leading-tight">{n.title}</p>
                                <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>

    )
}
