import {Users} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function SuggestionsSection(){
    return (
        <section className="h-full overflow-hidden border-border/60 rounded-[var(--radius)] border bg-card text-card-foreground shadow-sm">
            <div className="drag-handle absolute right-2 top-2 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs text-muted-foreground bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 cursor-move">
                ⠿ Trascina
            </div>
            <div className="p-5 md:p-6 border-b">
                <h3 className="text-lg font-semibold">Suggerimenti per te</h3>
                <p className="text-sm text-muted-foreground mt-1">Eventi simili e con amici iscritti.</p>
            </div>
            <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { id: 11, name: "Run Vicenza 10K", date: "19 Ott", friends: 1 },
                    { id: 12, name: "Half Venice Marathon", date: "02 Nov", friends: 3 },
                    { id: 13, name: "Trail Lessinia 15K", date: "16 Nov", friends: 0 },
                    { id: 14, name: "Milano City Run 5K", date: "23 Nov", friends: 2 },
                ].map((s) => (
                    <div key={s.id} className="rounded-lg border bg-background p-4 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">{s.date}</p>
                                <p className="font-medium truncate">{s.name}</p>
                            </div>
                            {s.friends > 0 ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                          <Users className="h-3.5 w-3.5" /> {s.friends} amici
                        </span>
                            ) : null}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <Link href={`/events/${s.id}`} className="flex-1">
                                <Button className="w-full" size="sm">Dettagli</Button>
                            </Link>
                            <Button variant="outline" size="sm">Salva</Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}
