"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Trophy, Flame, Moon, Footprints, Bike, Dumbbell, Shield } from "lucide-react";
import Image from "next/image";

// Simple hex badge component with soft 3D flat-style
function HexBadge({
                      title,
                      label,
                      colorFrom,
                      colorTo,
                      icon: Icon,
                      tag,
                  }: {
    title: string;
    label: string;
    colorFrom: string;
    colorTo: string;
    icon: React.ElementType;
    tag?: "NUOVO" | "TOP 3";
}) {
    return (
        <div
            className="relative group [--mx:50%] [--my:50%]"
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                e.currentTarget.style.setProperty("--mx", `${x}%`);
                e.currentTarget.style.setProperty("--my", `${y}%`);
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.setProperty("--mx", `50%`);
                e.currentTarget.style.setProperty("--my", `50%`);
            }}
        >
            {tag && (
                <span className="absolute -top-2 right-0 z-20 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground shadow-sm">
          {tag}
        </span>
            )}
            {/* Round badge - soft neumorphism */}
            <div className="relative mx-auto grid place-items-center">
                <div
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                    style={{
                        background: `conic-gradient(from 180deg at 50% 50%, ${colorFrom}, ${colorTo})`,
                        boxShadow:
                            "0 6px 20px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.05), 0 0 0 2px rgba(255,255,255,0.6) inset",
                    }}
                >
                    <div className="relative h-full w-full rounded-full bg-card">
                        {/* inner emboss */}
                        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_10px_10px_22px_rgba(0,0,0,0.06),inset_-10px_-10px_22px_rgba(255,255,255,0.7)]" />
                        {/* label chip */}
                        <span className="absolute left-1.5 top-1.5 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur">
              {label}
            </span>
                        {/* icon core */}
                        <div className="absolute inset-0 grid place-items-center">
                            <div className="relative grid size-16 place-items-center rounded-full border border-border/60 bg-muted/60 sm:size-20 shadow-[inset_4px_4px_10px_rgba(0,0,0,0.06),inset_-4px_-4px_10px_rgba(255,255,255,0.7)]">
{/*
                                <Icon className="size-7 text-foreground/80" />
*/}
                                <Avatar className="size-16 ring-1 ring-border">
                                    <AvatarImage src="https://images.unsplash.com/photo-1725653811863-8ca1776e126a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                    <AvatarFallback>FP</AvatarFallback>
                                </Avatar>
                                {/* luminous ring */}
                                <div
                                    className="pointer-events-none absolute inset-[-3px] rounded-full opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                                    style={{
                                        background:
                                            "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.5), rgba(255,255,255,0) 60%), conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.35), rgba(255,255,255,0) 45%, rgba(255,255,255,0.35))",
                                        filter: "blur(4px)",
                                    }}
                                />
                            </div>
                        </div>
                        {/* polish highlight that follows the cursor */}
                        <div
                            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                                background:
                                    "radial-gradient(120px 120px at var(--mx) var(--my), rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)",
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* caption under badge */}
            <div className="mt-2 w-24 text-center text-xs font-semibold text-foreground/80 line-clamp-2 sm:w-28">
                {title}
            </div>
        </div>
    );
}

function LockedIcon({ children }: { children: React.ReactNode }) {
    return <div className="grid size-10 place-items-center rounded-full border border-border bg-muted text-muted-foreground grayscale">{children}</div>;
}

export default function Home() {
    const user = {
        name: "Federico Parezzan",
        level: 5,
        points: 609,
        nextLevelProgress: 82, // percent
        avatar:
            "https://images.unsplash.com/photo-1725653811863-8ca1776e126a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    const achieved = [
        { title: "Corsa a settembre", label: "10K", icon: Trophy, from: "#22C55E", to: "#16A34A" },
        { title: "Periodo di sonno", label: "×64", icon: Moon, from: "#7C3AED", to: "#A855F7", tag: "NUOVO" as const },
        { title: "Asana di settembre", label: "30", icon: Flame, from: "#F59E0B", to: "#FB923C" },
        { title: "Weekend 10K", label: "10K", icon: Footprints, from: "#06B6D4", to: "#0EA5E9" },
        { title: "50 mi", label: "50 mi", icon: Bike, from: "#8B5CF6", to: "#6366F1", tag: "TOP 3" as const },
        { title: "Podio passi", label: "TOP 3", icon: Shield, from: "#F97316", to: "#EF4444" },
    ];

    const available = [
        {
            title: "September Ride to 100",
            desc:
                "Partecipa alla sfida e registra 100 km di attività ciclistiche dal 21 al 27 settembre.",
            tags: ["Tempo limitato", "Sfida attiva"],
            icon: Bike,
        },
        {
            title: "Weekend di 5 km",
            desc:
                "Registra un'attività di corsa di 5 km dal 26 al 28 settembre.",
            tags: ["Tempo limitato"],
            icon: Footprints,
        },
        {
            title: "Settembre intenso",
            desc:
                "Raggiungi il tuo obiettivo di minuti di intensità in due settimane diverse, dal 1° al 28 settembre.",
            tags: ["Sfida attiva"],
            icon: Flame,
        },
    ];

    return (
        <div className="min-h-screen ">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-20 ring-1 ring-border">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>FP</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">I tuoi badge</h1>
                            <p className="mt-1 text-sm text-muted-foreground">{user.name}</p>
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
                  <Shield className="size-3.5 text-primary" /> Livello {user.level}
                </span>
                                <span>•</span>
                                <span>{user.points} punti</span>
                            </div>
                        </div>
                    </div>

                    <Card className="w-full max-w-sm sm:w-[380px]">
                        <CardContent className="p-4">
                            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                                <span>Progresso al prossimo livello</span>
                                <span className="font-semibold text-primary">{Math.round(user.nextLevelProgress)}%</span>
                            </div>
                            <Progress value={user.nextLevelProgress} className="h-3 [&>div]:bg-primary" />
                            <p className="mt-2 text-xs text-muted-foreground">{Math.max(0, 100 - user.nextLevelProgress)}% rimanente</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="achieved" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-2 rounded-full bg-secondary p-1">
                        <TabsTrigger value="achieved" className="rounded-full data-[state=active]:bg-card data-[state=active]:text-foreground">Badge Raggiunti</TabsTrigger>
                        <TabsTrigger value="available" className="rounded-full data-[state=active]:bg-card data-[state=active]:text-foreground">Badge Disponibili</TabsTrigger>
                    </TabsList>

                    {/* Achieved */}
                    <TabsContent value="achieved" className="mt-6 sm:mt-8">
                        <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {achieved.map((b, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <HexBadge
                                        title={b.title}
                                        label={b.label}
                                        icon={b.icon}
                                        colorFrom={b.from}
                                        colorTo={b.to}
                                        tag={b.tag}
                                    />
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Available */}
                    <TabsContent value="available" className="mt-6 space-y-4 sm:mt-8">
                        {available.map((item, idx) => (
                            <Card key={idx} className="border-border/60 transition-shadow hover:shadow-sm">
                                <CardContent className="flex items-start gap-4 p-4 sm:p-5">
                                    <LockedIcon>
                                        <item.icon className="size-5" />
                                    </LockedIcon>
                                    <div className="flex-1">
                                        <h3 className="font-semibold leading-snug">{item.title}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                            {item.tags.map((t) => (
                                                <Badge
                                                    key={t}
                                                    className="border border-border bg-card text-muted-foreground hover:bg-secondary/60"
                                                >
                                                    {t.toUpperCase()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}
