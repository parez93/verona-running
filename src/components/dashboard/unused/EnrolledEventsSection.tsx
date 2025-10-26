import {CheckCircle2, Clock8, CreditCard, Trophy} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function EnrolledEventsSection(){
    return (
        <section className="h-full overflow-hidden border-border/60 rounded-[var(--radius)] border bg-card text-card-foreground shadow-sm">
            <div className="drag-handle absolute right-2 top-2 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs text-muted-foreground bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 cursor-move">
                ⠿ Trascina
            </div>
            <div className="p-5 md:p-6 border-b">
                <h3 className="text-lg font-semibold">Eventi a cui sei iscritto</h3>
                <p className="text-sm text-muted-foreground mt-1">Una panoramica delle tue prossime gare.</p>
            </div>
            <ul className="divide-y">
                {[
                    { id: 1, name: "Verona Running 10K", date: "12 Ott", status: "confermata" as const, badge: "Hai partecipato a 3 edizioni" },
                    { id: 2, name: "Mezza di Padova", date: "26 Ott", status: "pagamento completato" as const, badge: "Nuovo PB possibile" },
                    { id: 3, name: "Trail Garda 21K", date: "09 Nov", status: "in sospeso" as const, badge: "Amici iscritti: 2" },
                ].map((ev) => (
                    <li key={ev.id} className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{ev.date}</span>
                                <span className="h-1 w-1 rounded-full bg-border" />
                                <Link href={`/events/${ev.id}`} className="font-medium hover:underline truncate">{ev.name}</Link>
                            </div>
                            <div className="mt-1 text-xs inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-muted-foreground">
                                <Trophy className="h-3.5 w-3.5 text-primary" /> {ev.badge}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                      <span className={
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium " +
                          (ev.status === "confermata"
                              ? "bg-green-100 text-green-700"
                              : ev.status === "in sospeso"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-700")
                      }>
                        {ev.status === "confermata" && <CheckCircle2 className="h-3.5 w-3.5" />}
                          {ev.status === "in sospeso" && <Clock8 className="h-3.5 w-3.5" />}
                          {ev.status === "pagamento completato" && <CreditCard className="h-3.5 w-3.5" />}
                          {ev.status}
                      </span>
                            <Link href={`/events/${ev.id}`}>
                                <Button size="sm" variant="outline">Apri</Button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </section>

    )
}
