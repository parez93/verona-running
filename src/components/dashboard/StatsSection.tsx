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
    PencilLine, Timer, TrendingUp, Trophy, Users
} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function StatsSection(){
    return (
        <section className="rounded-[var(--radius)] border bg-card text-card-foreground shadow-sm">
            <div className="p-5 md:p-6 border-b">
                <h3 className="text-lg font-semibold">Statistiche personali</h3>
                <p className="text-sm text-muted-foreground mt-1">I tuoi progressi negli eventi.</p>
            </div>
            <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Eventi completati</p>
                        <Trophy className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">12</p>
                    <p className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" /> +2 rispetto all'anno scorso
                    </p>
                </div>
                <div className="rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Totale km (Verona Running)</p>
                        <Users className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">84 km</p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[68%] rounded-full bg-primary/70" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Obiettivo 100 km</p>
                </div>
                <div className="rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">PB 10K</p>
                        <Timer className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">42:18</p>
                    <p className="mt-1 text-xs text-muted-foreground">Aggiornato 2025-06-09</p>
                </div>
                <div className="rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">PB Mezza Maratona</p>
                        <Timer className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">1:35:27</p>
                    <p className="mt-1 text-xs text-muted-foreground">Aggiornato 2025-04-21</p>
                </div>
            </div>
        </section>
    )
}
