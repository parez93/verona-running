'use client';

import { motion } from 'framer-motion';
import { currentUser } from './gamification-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Clock, Flame, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {getISOWeek} from "date-fns";

export default function StatisticsPage() {
    // Dati km per mese (ultimi 6 mesi) - LINE CHART
    const monthlyKm = [
        { month: 'Ott', year: 2024, km: 45 },
        { month: 'Nov', year: 2024, km: 60 },
        { month: 'Dic', year: 2024, km: 55 },
        { month: 'Gen', year: 2025, km: 70 },
        { month: 'Feb', year: 2025, km: 65 },
        { month: 'Mar', year: 2025, km: 5 },
    ];

    // Dati punti per mese (ultimi 6 mesi) - BAR CHART
    const monthlyPoints = [
        { month: 'Ott', year: 2024, points: 180 },
        { month: 'Nov', year: 2024, points: 240 },
        { month: 'Dic', year: 2024, points: 220 },
        { month: 'Gen', year: 2025, points: 280 },
        { month: 'Feb', year: 2025, points: 260 },
        { month: 'Mar', year: 2025, points: 340 },
    ];

    // Distribuzione distanze - PIE CHART
/*    const distanceDistribution = [
        { range: '0-3 km', count: 4, color: 'from-blue-500 to-blue-400' },
        { range: '3-5 km', count: 12, color: 'from-green-500 to-green-400' },
        { range: '5-7 km', count: 6, color: 'from-yellow-500 to-yellow-400' },
        { range: '7+ km', count: 2, color: 'from-red-500 to-red-400' },
    ];

    const totalDistanceCount = distanceDistribution.reduce((sum, item) => sum + item.count, 0);
*/
    // Progress vs Goal - RADIAL PROGRESS
    const monthlyGoal = 20; // km goal per mese
    const currentMonthKm = monthlyKm[monthlyKm.length - 1].km;
    const goalProgress = Math.min((currentMonthKm / monthlyGoal) * 100, 100);

    const stats = [
        {
            icon: Activity,
            label: 'Corse Totali',
            value: currentUser.totalRuns,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
        },
        {
            icon: TrendingUp,
            label: 'Distanza Totale',
            value: `${currentUser.totalDistance}km`,
            color: 'text-green-500',
            bg: 'bg-green-500/10',
        },
/*        {
            icon: Zap,
            label: 'Passo Medio',
            value: `${currentUser.averagePace} min/km`,
            color: 'text-yellow-500',
            bg: 'bg-yellow-500/10',
        },
        {
            icon: Target,
            label: 'Miglior Passo',
            value: `${currentUser.bestPace} min/km`,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
        },*/
        {
            icon: Flame,
            label: 'Serie Attuale',
            value: `${currentUser.currentStreak} settimane`,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10',
        },
/*        {
            icon: Clock,
            label: 'Tempo Totale',
            value: `${Math.floor(currentUser.totalTimeRunning / 60)}h ${currentUser.totalTimeRunning % 60}m`,
            color: 'text-red-500',
            bg: 'bg-red-500/10',
        },*/
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6"
                    >
                        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                            <Activity className="h-10 w-10 text-primary" />
                            Statistiche
                        </h1>
                        <p className="text-muted-foreground">Le tue performance e progressi</p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold">{stat.value}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* LINE CHART - Chilometri per Mese */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Chilometri per Mese</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 relative">
                                    {/* Line chart */}
                                    <svg className="w-full h-full" viewBox="0 0 400 200">
                                        {/* Grid lines */}
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <line
                                                key={i}
                                                x1="40"
                                                y1={20 + i * 40}
                                                x2="380"
                                                y2={20 + i * 40}
                                                stroke="currentColor"
                                                strokeOpacity="0.1"
                                                strokeWidth="1"
                                            />
                                        ))}

                                        {/* Line path */}
                                        <motion.path
                                            d={(() => {
                                                const maxKm = Math.max(...monthlyKm.map(m => m.km));
                                                const points = monthlyKm.map((data, i) => {
                                                    const x = 60 + i * 60;
                                                    const y = 180 - (data.km / maxKm) * 140;
                                                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                                }).join(' ');
                                                return points;
                                            })()}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, delay: 0.7 }}
                                            className="text-primary"
                                        />

                                        {/* Data points */}
                                        {monthlyKm.map((data, i) => {
                                            const maxKm = Math.max(...monthlyKm.map(m => m.km));
                                            const x = 60 + i * 60;
                                            const y = 180 - (data.km / maxKm) * 140;

                                            return (
                                                <g key={i}>
                                                    <motion.circle
                                                        cx={x}
                                                        cy={y}
                                                        r="6"
                                                        fill="currentColor"
                                                        className="text-primary"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                                                    />
                                                    <motion.circle
                                                        cx={x}
                                                        cy={y}
                                                        r="3"
                                                        fill="white"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.8 + i * 0.1 }}
                                                    />
                                                    {/* Label */}
                                                    <text
                                                        x={x}
                                                        y="195"
                                                        textAnchor="middle"
                                                        className="text-xs fill-muted-foreground"
                                                    >
                                                        {data.month}
                                                    </text>
                                                    {/* Value on hover */}
                                                    <text
                                                        x={x}
                                                        y={y - 12}
                                                        textAnchor="middle"
                                                        className="text-xs font-semibold fill-foreground opacity-0 hover:opacity-100"
                                                    >
                                                        {data.km}
                                                    </text>
                                                </g>
                                            );
                                        })}
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* BAR CHART - Punti per Mese */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Punti per Mese</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-end justify-between gap-2">
                                    {monthlyPoints.map((data, index) => {
                                        const maxPoints = Math.max(...monthlyPoints.map(m => m.points));
                                        const height = (data.points / maxPoints) * 100;

                                        return (
                                            <motion.div
                                                key={`${data.month}-${data.year}`}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                                className="flex-1 relative group"
                                            >
                                                <div
                                                    className="w-full rounded-t-lg bg-gradient-to-t from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 transition-colors"
                                                    style={{ height: '100%' }}
                                                />

                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                    <div className="bg-popover text-popover-foreground p-2 rounded-lg shadow-lg text-xs whitespace-nowrap border border-border">
                                                        <div className="font-semibold">{data.points} punti</div>
                                                        <div className="text-muted-foreground">
                                                            {data.month} {data.year}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Month label */}
                                                <div className="text-xs text-muted-foreground text-center mt-2 font-medium">
                                                    {data.month}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* PIE CHART - Distribuzione Distanze */}
{/*                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Distribuzione Distanze</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center gap-8">
                                     Pie chart
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                            {(() => {
                                                let currentAngle = 0;
                                                return distanceDistribution.map((item, index) => {
                                                    const percentage = (item.count / totalDistanceCount) * 100;
                                                    const angle = (percentage / 100) * 360;
                                                    const startAngle = currentAngle;
                                                    currentAngle += angle;

                                                    const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                                                    const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                                                    const endX = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
                                                    const endY = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
                                                    const largeArc = angle > 180 ? 1 : 0;

                                                    const colors = [
                                                        '#3b82f6',
                                                        '#22c55e',
                                                        '#eab308',
                                                        '#ef4444',
                                                    ];

                                                    return (
                                                        <motion.path
                                                            key={index}
                                                            d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                                                            fill={colors[index]}
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
                                                            className="hover:opacity-80 transition-opacity cursor-pointer"
                                                        />
                                                    );
                                                });
                                            })()}
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">{totalDistanceCount}</div>
                                                <div className="text-xs text-muted-foreground">corse</div>
                                            </div>
                                        </div>
                                    </div>

                                     Legend
                                    <div className="space-y-2">
                                        {distanceDistribution.map((item, index) => {
                                            const colors = [
                                                'bg-blue-500',
                                                'bg-green-500',
                                                'bg-yellow-500',
                                                'bg-red-500',
                                            ];
                                            const percentage = ((item.count / totalDistanceCount) * 100).toFixed(0);

                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 1 + index * 0.1 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                                                    <div className="text-sm">
                                                        <span className="font-medium">{item.range}</span>
                                                        <span className="text-muted-foreground ml-2">
                              {item.count} ({percentage}%)
                            </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>*/}

                    {/* RADIAL PROGRESS - Progress vs Goal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Obiettivo Mensile</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center py-8">
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                            {/* Background circle */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                className="text-muted opacity-20"
                                            />
                                            {/* Progress circle */}
                                            <motion.circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                strokeDasharray={`${2 * Math.PI * 40}`}
                                                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                                                animate={{
                                                    strokeDashoffset: 2 * Math.PI * 40 * (1 - goalProgress / 100),
                                                }}
                                                transition={{ duration: 1.5, delay: 1 }}
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#22c55e" />
                                                    <stop offset="100%" stopColor="#10b981" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 1.2, type: 'spring' }}
                                                className="text-4xl font-bold text-green-500"
                                            >
                                                {Math.round(goalProgress)}%
                                            </motion.div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                {currentMonthKm} / {monthlyGoal} km
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {goalProgress >= 100 ? '🎉 Obiettivo raggiunto!' : 'questo mese'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {goalProgress < 100 && (
                                    <div className="text-center text-sm text-muted-foreground">
                                        Ti mancano {monthlyGoal - currentMonthKm} km per raggiungere l'obiettivo
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Progress Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Streak Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Flame className="h-5 w-5 text-orange-500" />
                                    Serie Consecutiva
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.9, type: 'spring' }}
                                        className="text-6xl font-bold text-orange-500 mb-2"
                                    >
                                        {currentUser.currentStreak}
                                    </motion.div>
                                    <p className="text-muted-foreground mb-4">settimane consecutive</p>
                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                        {[...Array(getISOWeek(new Date()) + 2)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 1 + i * 0.05 }}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    i < currentUser.currentStreak
                                                        ? 'bg-orange-500'
                                                        : 'bg-muted'
                                                }`}
                                            >
                                                {i < currentUser.currentStreak && (
                                                    <Flame className="h-4 w-4 text-white" />
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        Record: {currentUser.longestStreak} settimane
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Achievements Progress */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-purple-500" />
                                    Prossimi Obiettivi
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {currentUser.achievements
                                        .filter(a => !a.unlocked)
                                        .slice(0, 3)
                                        .map((achievement, index) => (
                                            <motion.div
                                                key={achievement.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.9 + index * 0.1 }}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl">{achievement.icon}</span>
                                                        <div>
                                                            <p className="font-semibold text-sm">{achievement.name}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {achievement.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-semibold">
                            {achievement.progress}%
                          </span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${achievement.progress}%` }}
                                                        transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
