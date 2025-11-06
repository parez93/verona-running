'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { leaderboardData } from './gamification-data';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type LeaderboardType = 'points' | 'runs';
type TimePeriod = 'month' | 'year' | 'alltime';

export default function LeaderboardPage() {
    const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>('points');
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('alltime');

    const sortedData = useMemo(() => {
        const data = [...leaderboardData];

        // Sort based on type and period
        data.sort((a, b) => {
            let valueA = 0;
            let valueB = 0;

            if (leaderboardType === 'points') {
                if (timePeriod === 'month') {
                    valueA = a.monthPoints;
                    valueB = b.monthPoints;
                } else if (timePeriod === 'year') {
                    valueA = a.yearPoints;
                    valueB = b.yearPoints;
                } else {
                    valueA = a.points;
                    valueB = b.points;
                }
            } else {
                if (timePeriod === 'month') {
                    valueA = a.monthRuns;
                    valueB = b.monthRuns;
                } else if (timePeriod === 'year') {
                    valueA = a.yearRuns;
                    valueB = b.yearRuns;
                } else {
                    valueA = a.totalRuns;
                    valueB = b.totalRuns;
                }
            }

            return valueB - valueA;
        });

        // Update ranks
        return data.map((user, index) => ({
            ...user,
            rank: index + 1,
        }));
    }, [leaderboardType, timePeriod]);

    const topThree = sortedData.slice(0, 3);

    // Get users from position 4 to 10
    const tableData = useMemo(() => {
        const positionsFourToTen = sortedData.slice(3, 10);
        const currentUser = sortedData.find(user => user.name === 'Tu');

        // If current user is beyond position 10, add them as a separate row
        if (currentUser && currentUser.rank > 10) {
            return [...positionsFourToTen, currentUser];
        }

        return positionsFourToTen;
    }, [sortedData]);

    const getMedalIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="h-6 w-6 text-yellow-500" />;
            case 2:
                return <Medal className="h-6 w-6 text-gray-400" />;
            case 3:
                return <Medal className="h-6 w-6 text-amber-600" />;
            default:
                return null;
        }
    };

    const getDisplayValue = (user: typeof leaderboardData[0]) => {
        if (leaderboardType === 'points') {
            if (timePeriod === 'month') return user.monthPoints;
            if (timePeriod === 'year') return user.yearPoints;
            return user.points;
        } else {
            if (timePeriod === 'month') return user.monthRuns;
            if (timePeriod === 'year') return user.yearRuns;
            return user.totalRuns;
        }
    };

    const getValueLabel = () => {
        return leaderboardType === 'points' ? 'punti' : 'eventi';
    };

    // Check if current user is beyond position 10
    const currentUser = sortedData.find(user => user.name === 'Tu');
    const showUserSeparator = currentUser && currentUser.rank > 10;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-2 sm:gap-3">
                            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
                            Classifica
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Vedi come ti confronti con gli altri corridori
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mb-6"
                    >
                        {/* Leaderboard Type */}
                        <Tabs value={leaderboardType} onValueChange={(v) => setLeaderboardType(v as LeaderboardType)}>
                            <TabsList className="w-full sm:w-auto">
                                <TabsTrigger value="points" className="flex-1 sm:flex-initial text-xs sm:text-sm">Punti</TabsTrigger>
                                <TabsTrigger value="runs" className="flex-1 sm:flex-initial text-xs sm:text-sm">Eventi</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {/* Time Period */}
                        <Tabs value={timePeriod} onValueChange={(v) => setTimePeriod(v as TimePeriod)}>
                            <TabsList className="w-full sm:w-auto grid grid-cols-3">
                                <TabsTrigger value="month" className="text-xs sm:text-sm">Mese</TabsTrigger>
                                <TabsTrigger value="year" className="text-xs sm:text-sm">Anno</TabsTrigger>
                                <TabsTrigger value="alltime" className="text-xs sm:text-sm">All Time</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </motion.div>
                </div>

                {/* Olympic Style Podium */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 sm:mb-12"
                >
                    <div className="relative flex items-end justify-center gap-2 sm:gap-4 md:gap-8 max-w-2xl mx-auto">
                        {/* Second Place */}
                        <motion.div
                            key={`second-${topThree[1]?.id}-${leaderboardType}-${timePeriod}`}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                            className="flex flex-col items-center flex-1"
                        >
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="mb-2 sm:mb-4 text-center"
                            >
                                <Avatar className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 mx-auto mb-2 sm:mb-3 border-2 sm:border-4 border-slate-400 shadow-lg">
                                    <AvatarImage src={topThree[1]?.avatar} />
                                    <AvatarFallback className="text-sm sm:text-lg md:text-xl bg-slate-100 dark:bg-slate-800">{topThree[1]?.name[0]}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-bold text-xs sm:text-sm mb-1 px-1 truncate">{topThree[1]?.name}</h3>
                                <p className="text-[10px] sm:text-xs text-muted-foreground">{getDisplayValue(topThree[1])} {getValueLabel()}</p>
                                <div className="flex justify-center gap-0.5 sm:gap-1 mt-1 sm:mt-2">
                                    {[...Array(3)].map((_, i) => (
                                        <Star key={i} className="h-2 w-2 sm:h-3 sm:w-3 fill-slate-400 text-slate-400" />
                                    ))}
                                </div>
                            </motion.div>

                            <div className="w-full bg-gradient-to-b from-slate-300 to-slate-500 dark:from-slate-700 dark:to-slate-900 rounded-t-xl p-2 sm:p-4 shadow-2xl border-t-2 sm:border-t-4 border-slate-400 relative" style={{ height: '80px', ['@media (min-width: 640px)']: { height: '110px' }, ['@media (min-width: 768px)']: { height: '140px' } } as any}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-xl"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 sm:mb-1 drop-shadow-lg">2</div>
                                    <Medal className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white drop-shadow-md" />
                                </div>
                            </div>
                        </motion.div>

                        {/* First Place */}
                        <motion.div
                            key={`first-${topThree[0]?.id}-${leaderboardType}-${timePeriod}`}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                            className="flex flex-col items-center flex-1"
                        >
                            <motion.div
                                whileHover={{ y: -8, scale: 1.05 }}
                                className="mb-2 sm:mb-4 text-center"
                            >
                                <div className="relative inline-block mb-2 sm:mb-3">
                                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 border-2 sm:border-4 border-yellow-500 shadow-2xl ring-2 sm:ring-4 ring-yellow-300/50">
                                        <AvatarImage src={topThree[0]?.avatar} />
                                        <AvatarFallback className="text-lg sm:text-xl md:text-2xl bg-yellow-50 dark:bg-yellow-950">{topThree[0]?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-500 rounded-full p-1 sm:p-1.5 shadow-lg">
                                        <Trophy className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                                    </div>
                                </div>
                                <h3 className="font-bold text-sm sm:text-base mb-1 px-1 truncate">{topThree[0]?.name}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground font-semibold">{getDisplayValue(topThree[0])} {getValueLabel()}</p>
                                <div className="flex justify-center gap-0.5 sm:gap-1 mt-1 sm:mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-2 w-2 sm:h-3 sm:w-3 fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>
                            </motion.div>

                            <div className="w-full bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 dark:from-yellow-600 dark:via-yellow-700 dark:to-yellow-900 rounded-t-xl p-2 sm:p-4 shadow-2xl border-t-2 sm:border-t-4 border-yellow-500 relative" style={{ height: '100px', ['@media (min-width: 640px)']: { height: '140px' }, ['@media (min-width: 768px)']: { height: '180px' } } as any}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20 rounded-t-xl"></div>
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-200 to-transparent"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 drop-shadow-lg">1</div>
                                    <Trophy className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white drop-shadow-md" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Third Place */}
                        <motion.div
                            key={`third-${topThree[2]?.id}-${leaderboardType}-${timePeriod}`}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                            className="flex flex-col items-center flex-1"
                        >
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="mb-2 sm:mb-4 text-center"
                            >
                                <Avatar className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 mx-auto mb-2 sm:mb-3 border-2 sm:border-4 border-amber-600 shadow-lg">
                                    <AvatarImage src={topThree[2]?.avatar} />
                                    <AvatarFallback className="text-sm sm:text-lg md:text-xl bg-amber-50 dark:bg-amber-950">{topThree[2]?.name[0]}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-bold text-xs sm:text-sm mb-1 px-1 truncate">{topThree[2]?.name}</h3>
                                <p className="text-[10px] sm:text-xs text-muted-foreground">{getDisplayValue(topThree[2])} {getValueLabel()}</p>
                                <div className="flex justify-center gap-0.5 sm:gap-1 mt-1 sm:mt-2">
                                    {[...Array(2)].map((_, i) => (
                                        <Star key={i} className="h-2 w-2 sm:h-3 sm:w-3 fill-amber-600 text-amber-600" />
                                    ))}
                                </div>
                            </motion.div>

                            <div className="w-full bg-gradient-to-b from-amber-400 to-amber-700 dark:from-amber-700 dark:to-amber-950 rounded-t-xl p-2 sm:p-4 shadow-2xl border-t-2 sm:border-t-4 border-amber-600 relative" style={{ height: '60px', ['@media (min-width: 640px)']: { height: '85px' }, ['@media (min-width: 768px)']: { height: '110px' } } as any}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-xl"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 sm:mb-1 drop-shadow-lg">3</div>
                                    <Medal className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white drop-shadow-md" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.5 }}
                        className="h-2 sm:h-3 bg-gradient-to-b from-muted to-muted/50 rounded-b-lg shadow-lg max-w-2xl mx-auto"
                    />
                </motion.div>

                {/* Full Leaderboard Table */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card className="overflow-hidden">
                        <div className="divide-y">
                            {tableData.map((user, index) => {
                                // Show separator before current user if they're beyond position 10
                                const isCurrentUserBeyond = showUserSeparator && user.name === 'Tu';

                                return (
                                    <div key={`${user.id}-${leaderboardType}-${timePeriod}`}>
                                        {isCurrentUserBeyond && (
                                            <div className="p-2 text-center text-xs text-muted-foreground bg-muted/30">
                                                <span>...</span>
                                            </div>
                                        )}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            className={`p-3 sm:p-4 flex items-center gap-2 sm:gap-4 transition-colors ${
                                                user.name === 'Tu'
                                                    ? 'bg-primary/10 hover:bg-primary/20'
                                                    : 'hover:bg-muted/50'
                                            }`}
                                        >
                                            {/* Rank */}
                                            <div className="flex-shrink-0 w-8 sm:w-12 text-center">
                                                {user.rank <= 3 ? (
                                                    <div className="flex justify-center">{getMedalIcon(user.rank)}</div>
                                                ) : (
                                                    <span className="text-lg sm:text-xl font-bold text-muted-foreground">
                            {user.rank}
                          </span>
                                                )}
                                            </div>

                                            {/* Avatar and Name */}
                                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold truncate text-sm sm:text-base">
                                                    {user.name}
                                                    {user.name === 'Tu' && (
                                                        <Badge variant="outline" className="ml-2 text-xs">
                                                            Tu
                                                        </Badge>
                                                    )}
                                                </h3>
                                                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                                                    <span>{user.totalRuns} corse</span>
                                                    <span className="hidden xs:inline">•</span>
                                                    <span className="hidden xs:inline">{user.totalDistance}km</span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="hidden sm:flex items-center gap-1">
                            <Award className="h-3 w-3" />
                                                        {user.badges}
                          </span>
                                                </div>
                                            </div>

                                            {/* Points/Runs based on filter */}
                                            <div className="flex-shrink-0 text-right">
                                                <div className="text-base sm:text-xl font-bold">{getDisplayValue(user).toLocaleString()}</div>
                                                <div className="text-[10px] sm:text-xs text-muted-foreground">{getValueLabel()}</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
