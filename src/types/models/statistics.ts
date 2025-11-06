export type Stats = {
    currentStreak: number;
    longestStreak: number;
    monthlyKm: MonthlyKm[];
    monthlyPoints: MonthlyPoints[];
    streakWeeks: StreakWeek[]; // tipicamente lunghezza 52 o 53
    totalDistance: number; // totale km (es. 25)
    totalRuns: number;     // numero di corse (es. 5)
}

export type MonthlyKm = {
    month: string; // es. 'ago', 'set', 'ott', 'nov'
    year: number;  // es. 2025
    km: number;
};

export type MonthlyPoints = {
    month: string;
    year: number;
    points: number;
};

export type StreakWeek = {
    week: number;   // 1..53
    active: boolean;
};

