export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    condition: number;
    type: 'runs' | 'distance' | 'streak' | 'speed';
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    unlocked: boolean;
    unlockedAt?: Date;
    progress: number;
}

export interface UserStats {
    totalRuns: number;
    totalDistance: number; // in km
    averagePace: number; // min/km
    bestPace: number; // min/km
    currentStreak: number; // days
    longestStreak: number; // days
    totalTimeRunning: number; // minutes
    achievements: Achievement[];
}

export interface LeaderboardUser {
    id: string;
    name: string;
    avatar: string;
    totalRuns: number;
    totalDistance: number;
    rank: number;
    points: number;
    badges: number;
    // Period-specific data
    monthRuns: number;
    monthPoints: number;
    yearRuns: number;
    yearPoints: number;
}

// Mock current user data
export const currentUser: UserStats = {
    totalRuns: 24,
    totalDistance: 120, // 24 runs * 5km
    averagePace: 5.5,
    bestPace: 4.8,
    currentStreak: 7,
    longestStreak: 14,
    totalTimeRunning: 660, // 11 hours
    achievements: [],
};

// All available achievements
export const allAchievements: Achievement[] = [
    {
        id: 'first-run',
        name: 'Primo Passo',
        description: 'Completa la tua prima corsa di 5km',
        icon: '🏃',
        condition: 1,
        type: 'runs',
        tier: 'bronze',
        unlocked: true,
        unlockedAt: new Date('2024-01-15'),
        progress: 100,
    },
    {
        id: 'runner-10',
        name: 'Corridore Dedicato',
        description: 'Completa 10 corse',
        icon: '⭐',
        condition: 10,
        type: 'runs',
        tier: 'bronze',
        unlocked: true,
        unlockedAt: new Date('2024-02-20'),
        progress: 100,
    },
    {
        id: 'runner-25',
        name: 'Maratoneta',
        description: 'Completa 25 corse',
        icon: '🎯',
        condition: 25,
        type: 'runs',
        tier: 'silver',
        unlocked: false,
        progress: 96,
    },
    {
        id: 'runner-50',
        name: 'Veterano',
        description: 'Completa 50 corse',
        icon: '💪',
        condition: 50,
        type: 'runs',
        tier: 'gold',
        unlocked: false,
        progress: 48,
    },
    {
        id: 'runner-100',
        name: 'Leggenda',
        description: 'Completa 100 corse',
        icon: '👑',
        condition: 100,
        type: 'runs',
        tier: 'platinum',
        unlocked: false,
        progress: 24,
    },
    {
        id: 'distance-50',
        name: 'Esploratore',
        description: 'Corri 50km in totale',
        icon: '🗺️',
        condition: 50,
        type: 'distance',
        tier: 'bronze',
        unlocked: true,
        unlockedAt: new Date('2024-02-01'),
        progress: 100,
    },
    {
        id: 'distance-100',
        name: 'Viaggiatore',
        description: 'Corri 100km in totale',
        icon: '🌍',
        condition: 100,
        type: 'distance',
        tier: 'silver',
        unlocked: true,
        unlockedAt: new Date('2024-03-10'),
        progress: 100,
    },
    {
        id: 'distance-250',
        name: 'Ultra Runner',
        description: 'Corri 250km in totale',
        icon: '🚀',
        condition: 250,
        type: 'distance',
        tier: 'gold',
        unlocked: false,
        progress: 48,
    },
    {
        id: 'distance-500',
        name: 'Campione del Mondo',
        description: 'Corri 500km in totale',
        icon: '🏆',
        condition: 500,
        type: 'distance',
        tier: 'platinum',
        unlocked: false,
        progress: 24,
    },
    {
        id: 'streak-3',
        name: 'Consistente',
        description: 'Mantieni una serie di 3 giorni',
        icon: '🔥',
        condition: 3,
        type: 'streak',
        tier: 'bronze',
        unlocked: true,
        unlockedAt: new Date('2024-01-20'),
        progress: 100,
    },
    {
        id: 'streak-7',
        name: 'Settimana Perfetta',
        description: 'Mantieni una serie di 7 giorni',
        icon: '⚡',
        condition: 7,
        type: 'streak',
        tier: 'silver',
        unlocked: true,
        unlockedAt: new Date('2024-03-15'),
        progress: 100,
    },
    {
        id: 'streak-14',
        name: 'Inarrestabile',
        description: 'Mantieni una serie di 14 giorni',
        icon: '💥',
        condition: 14,
        type: 'streak',
        tier: 'gold',
        unlocked: false,
        progress: 50,
    },
    {
        id: 'streak-30',
        name: 'Macchina Perfetta',
        description: 'Mantieni una serie di 30 giorni',
        icon: '🔱',
        condition: 30,
        type: 'streak',
        tier: 'platinum',
        unlocked: false,
        progress: 23,
    },
    {
        id: 'speed-5min',
        name: 'Velocista',
        description: 'Completa una corsa sotto i 5 min/km',
        icon: '⚡',
        condition: 5,
        type: 'speed',
        tier: 'silver',
        unlocked: true,
        unlockedAt: new Date('2024-03-05'),
        progress: 100,
    },
    {
        id: 'speed-4.5min',
        name: 'Fulmine',
        description: 'Completa una corsa sotto i 4.5 min/km',
        icon: '⚡️',
        condition: 4.5,
        type: 'speed',
        tier: 'gold',
        unlocked: false,
        progress: 94,
    },
];

currentUser.achievements = allAchievements;

// Mock leaderboard data
export const leaderboardData: LeaderboardUser[] = [
    {
        id: '1',
        name: 'Marco Rossi',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
        totalRuns: 48,
        totalDistance: 240,
        rank: 1,
        points: 2400,
        badges: 12,
        monthRuns: 8,
        monthPoints: 400,
        yearRuns: 48,
        yearPoints: 2400,
    },
    {
        id: '2',
        name: 'Laura Bianchi',
        avatar: 'https://images.unsplash.com/photo-1494790778202-cad84cf45f1d?w=100',
        totalRuns: 42,
        totalDistance: 210,
        rank: 2,
        points: 2100,
        badges: 11,
        monthRuns: 12,
        monthPoints: 600,
        yearRuns: 42,
        yearPoints: 2100,
    },
    {
        id: '3',
        name: 'Giuseppe Verdi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        totalRuns: 38,
        totalDistance: 190,
        rank: 3,
        points: 1900,
        badges: 10,
        monthRuns: 6,
        monthPoints: 300,
        yearRuns: 38,
        yearPoints: 1900,
    },
    {
        id: '4',
        name: 'Sofia Romano',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        totalRuns: 35,
        totalDistance: 175,
        rank: 4,
        points: 1750,
        badges: 9,
        monthRuns: 10,
        monthPoints: 500,
        yearRuns: 35,
        yearPoints: 1750,
    },
    {
        id: '5',
        name: 'Tu',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        totalRuns: 24,
        totalDistance: 120,
        rank: 15,
        points: 200,
        badges: 7,
        monthRuns: 5,
        monthPoints: 250,
        yearRuns: 24,
        yearPoints: 1200,
    },
    {
        id: '6',
        name: 'Andrea Ferrari',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        totalRuns: 22,
        totalDistance: 110,
        rank: 6,
        points: 1100,
        badges: 6,
        monthRuns: 4,
        monthPoints: 200,
        yearRuns: 22,
        yearPoints: 1100,
    },
    {
        id: '7',
        name: 'Elena Marino',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        totalRuns: 20,
        totalDistance: 100,
        rank: 7,
        points: 1000,
        badges: 6,
        monthRuns: 7,
        monthPoints: 350,
        yearRuns: 20,
        yearPoints: 1000,
    },
    {
        id: '8',
        name: 'Francesco Conti',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
        totalRuns: 18,
        totalDistance: 90,
        rank: 8,
        points: 900,
        badges: 5,
        monthRuns: 3,
        monthPoints: 150,
        yearRuns: 18,
        yearPoints: 900,
    },
    {
        id: '9',
        name: 'Giulia Ricci',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
        totalRuns: 15,
        totalDistance: 75,
        rank: 9,
        points: 750,
        badges: 4,
        monthRuns: 9,
        monthPoints: 450,
        yearRuns: 15,
        yearPoints: 750,
    },
    {
        id: '10',
        name: 'Paolo Esposito',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        totalRuns: 12,
        totalDistance: 60,
        rank: 10,
        points: 600,
        badges: 3,
        monthRuns: 2,
        monthPoints: 100,
        yearRuns: 12,
        yearPoints: 600,
    },
    {
        id: '11',
        name: 'Paolo Esposito 2',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        totalRuns: 12,
        totalDistance: 60,
        rank: 10,
        points: 600,
        badges: 3,
        monthRuns: 2,
        monthPoints: 100,
        yearRuns: 12,
        yearPoints: 600,
    },
    {
        id: '12',
        name: 'Paolo Esposito 3',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        totalRuns: 12,
        totalDistance: 60,
        rank: 10,
        points: 600,
        badges: 3,
        monthRuns: 2,
        monthPoints: 100,
        yearRuns: 12,
        yearPoints: 600,
    },
];

// Recent runs for statistics
export const recentRuns = [
    { date: '2024-03-15', distance: 5, pace: 5.2, time: 26 },
    { date: '2024-03-14', distance: 5, pace: 5.5, time: 27.5 },
    { date: '2024-03-13', distance: 5, pace: 5.3, time: 26.5 },
    { date: '2024-03-12', distance: 5, pace: 5.8, time: 29 },
    { date: '2024-03-11', distance: 5, pace: 5.4, time: 27 },
    { date: '2024-03-10', distance: 5, pace: 5.1, time: 25.5 },
    { date: '2024-03-09', distance: 5, pace: 4.8, time: 24 },
];
