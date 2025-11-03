"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    TrendingUp,
    Activity,
    Calendar,
    Users,
    Target,
    Trophy,
    Clock,
    MapPin,
    Zap,
    Award
} from "lucide-react";
import { useEffect, useState } from "react";

interface IndividualStats {
    averageTimeByDistance: Record<string, number>;
    averagePaceOverTime: Array<{ month: string; avgPace: number }>;
    monthlyKmProgression: Array<{ month: string; totalKm: number }>;
    personalBests: Record<string, number>;
}

interface ParticipationStats {
    eventsCompletedOverTime: Array<{ month: string; count: number }>;
    weeklyFrequency: number;
    monthlyFrequency: number;
    participationRatio: number;
    mostFrequentEventTypes: Array<{ eventType: string; count: number }>;
}

interface CommunityStats {
    runnerLevelDistribution: Array<{ level: string; count: number; percentage: number }>;
    avgKmPerUserThisMonth: number;
    totalTimeRunByClub: number;
    totalEvents: number;
    totalParticipants: number;
    totalCompletedEvents: number;
}

export default function StatisticsPage() {
    const [individualStats, setIndividualStats] = useState<IndividualStats | null>(null);
    const [participationStats, setParticipationStats] = useState<ParticipationStats | null>(null);
    const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userId = 11; // Example user ID

    useEffect(() => {
        const fetchAllStats = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [individualRes, participationRes, communityRes] = await Promise.all([
                    fetch(`/api/statistics/individual/${userId}`),
                    fetch(`/api/statistics/participation/${userId}`),
                    fetch('/api/statistics/community'),
                ]);

                if (!individualRes.ok || !participationRes.ok || !communityRes.ok) {
                    throw new Error('Errore nel caricamento delle statistiche');
                }

                const [individualData, participationData, communityData] = await Promise.all([
                    individualRes.json(),
                    participationRes.json(),
                    communityRes.json(),
                ]);

                setIndividualStats(individualData);
                setParticipationStats(participationData);
                setCommunityStats(communityData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Errore sconosciuto');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllStats();
    }, [userId]);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m ${secs}s`;
    };

    const getDistanceLabel = (distance: string): string => {
        const dist = parseFloat(distance);
        if (dist === 5) return '5K';
        if (dist === 10) return '10K';
        if (dist === 21) return '21K (Half)';
        if (dist === 42) return '42K (Marathon)';
        return `${dist}K`;
    };

    const getLevelColor = (level: string): string => {
        switch (level.toLowerCase()) {
            case 'beginner':
                return 'bg-blue-500';
            case 'intermediate':
                return 'bg-green-500';
            case 'advanced':
                return 'bg-orange-500';
            case 'expert':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getEventTypeLabel = (type: string): string => {
        switch (type) {
            case 'road':
                return 'Road';
            case 'trail':
                return 'Trail';
            case 'fun_run':
                return 'Fun Run';
            default:
                return type;
        }
    };

    if (isLoading) {
        return (
/*            <div className="min-h-screen pb-20 md:pb-8">
                <main className="container px-4 py-6 md:ml-64 max-w-7xl">*/
                    <div className="min-h-screen">
                        <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center h-[60vh]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            <p className="text-muted-foreground">Caricamento statistiche...</p>
                        </div>
                    </div>
{/*
                </main>
*/}
                        </div>
            </div>
        );
    }

    if (error) {
        return (
/*            <div className="min-h-screen pb-20 md:pb-8">
                <main className="container px-4 py-6 md:ml-64 max-w-7xl">*/
                    <div className="min-h-screen">
                        <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center h-[60vh]">
                        <Card className="max-w-md">
                            <CardHeader>
                                <CardTitle className="text-destructive">Errore</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{error}</p>
                            </CardContent>
                        </Card>
                    </div>
{/*
                </main>
*/}
                        </div>
            </div>
        );
    }

    return (
/*
        <div className="min-h-screen pb-20 md:pb-8">
*/
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
{/*
            <main className="container px-4 py-6 md:ml-64 max-w-7xl">
*/}
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <h1 className="text-3xl font-bold mb-2">Statistiche</h1>
                    <p className="text-muted-foreground">
                        Analizza le tue performance e i dati della community
                    </p>
                </motion.div>

                {/* Performance Individuale */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-primary" />
                        Performance Individuale
                    </h2>

{/*                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                         Tempo medio per distanza
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Clock className="w-5 h-5 text-primary" />
                                    Tempo Medio per Distanza
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(individualStats?.averageTimeByDistance || {}).map(
                                        ([distance, avgTime]) => (
                                            <div key={distance} className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium">{getDistanceLabel(distance)}</span>
                                                    <span className="text-muted-foreground">{avgTime.toFixed(1)} min</span>
                                                </div>
                                                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min((avgTime / 200) * 100, 100)}%` }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                         Personal Best
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Trophy className="w-5 h-5 text-primary" />
                                    Personal Best
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(individualStats?.personalBests || {}).map(
                                        ([distance, bestTime]) => (
                                            <div
                                                key={distance}
                                                className="flex items-center justify-between p-3 bg-success/10 rounded-lg"
                                            >
                                                <div>
                                                    <div className="font-semibold">{getDistanceLabel(distance)}</div>
                                                    <div className="text-xs text-muted-foreground">Miglior tempo</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-success">
                                                        {formatTime(bestTime)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>*/}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Passo medio nel tempo */}
{/*                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Passo Medio nel Tempo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {individualStats?.averagePaceOverTime.map((data, index) => (
                                        <div key={data.month} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{data.month}</span>
                                                <span className="text-muted-foreground">
                          {data.avgPace.toFixed(2)} min/km
                        </span>
                                            </div>
                                            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                                <motion.div
                                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-energy to-energy/80 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min((data.avgPace / 10) * 100, 100)}%` }}
                                                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>*/}

                        {/* Progressione mensile km */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Progressione Mensile KM
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {individualStats?.monthlyKmProgression.map((data, index) => {
                                        const maxKm = Math.max(
                                            ...individualStats.monthlyKmProgression.map((d) => d.totalKm)
                                        );
                                        return (
                                            <div key={data.month} className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium">{data.month}</span>
                                                    <span className="text-muted-foreground">
                            {data.totalKm.toFixed(1)} km
                          </span>
                                                </div>
                                                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-xp to-xp/80 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(data.totalKm / maxKm) * 100}%` }}
                                                        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                {/* Partecipazione */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-primary" />
                        Partecipazione
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Frequenza */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Zap className="w-5 h-5 text-primary" />
                                    Frequenza
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-3xl font-bold text-primary">
                                            {participationStats?.weeklyFrequency.toFixed(1)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Eventi/settimana</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-primary">
                                            {participationStats?.monthlyFrequency.toFixed(1)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Eventi/mese</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rapporto partecipazione */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Target className="w-5 h-5 text-primary" />
                                    Tasso di Partecipazione
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="text-5xl font-bold text-primary mb-2">
                                        {participationStats?.participationRatio.toFixed(0)}%
                                    </div>
                                    <div className="text-sm text-muted-foreground text-center">
                                        Eventi partecipati su totali disponibili
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tipologia eventi */}
{/*
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Award className="w-5 h-5 text-primary" />
                                    Tipologie Preferite
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {participationStats?.mostFrequentEventTypes.map((event) => (
                                        <div
                                            key={event.eventType}
                                            className="flex items-center justify-between p-2 bg-muted rounded-lg"
                                        >
                      <span className="font-medium text-sm">
                        {getEventTypeLabel(event.eventType)}
                      </span>
                                            <span className="text-sm text-muted-foreground">{event.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
*/}
                    </div>

                    {/* Eventi completati nel tempo */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Eventi Completati nel Tempo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {participationStats?.eventsCompletedOverTime.map((data, index) => {
                                    const maxCount = Math.max(
                                        ...participationStats.eventsCompletedOverTime.map((d) => d.count)
                                    );
                                    return (
                                        <div key={data.month} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{data.month}</span>
                                                <span className="text-muted-foreground">{data.count} eventi</span>
                                            </div>
                                            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                                                <motion.div
                                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-success to-success/80 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(data.count / Math.max(maxCount, 1)) * 100}%` }}
                                                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Community */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-primary" />
                        Statistiche Community
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Stats cards */}
{/*
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Tempo Totale del Club</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-primary">
                                    {communityStats?.totalTimeRunByClub.toFixed(0)}h
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">Ore corse in totale</p>
                            </CardContent>
                        </Card>
*/}

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Media KM/Utente</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-primary">
                                    {communityStats?.avgKmPerUserThisMonth.toFixed(1)}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">Km per utente questo mese</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Eventi & Partecipanti</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Eventi totali</span>
                                        <span className="text-2xl font-bold text-primary">
                      {communityStats?.totalEvents}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Partecipanti</span>
                                        <span className="text-2xl font-bold text-primary">
                      {communityStats?.totalParticipants}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Completati</span>
                                        <span className="text-2xl font-bold text-primary">
                      {communityStats?.totalCompletedEvents}
                    </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Distribuzione livelli runner */}
{/*
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Users className="w-5 h-5 text-primary" />
                                Distribuzione Livelli Runner
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {communityStats?.runnerLevelDistribution.map((level) => (
                                    <div key={level.level} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${getLevelColor(level.level)}`} />
                                                <span className="font-medium capitalize">{level.level}</span>
                                            </div>
                                            <span className="text-muted-foreground">
                        {level.count} runner ({level.percentage}%)
                      </span>
                                        </div>
                                        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                className={`absolute inset-y-0 left-0 rounded-full ${getLevelColor(
                                                    level.level
                                                )}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${level.percentage}%` }}
                                                transition={{ duration: 1, delay: 0.6 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
*/}
                </motion.div>
{/*
            </main>
*/}
            </div>
        </div>
    );
}
