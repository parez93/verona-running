type LeaderboardEntry = {
    id: string;
    name: string;
    surname: string;
    avatar: string | null;
    badges: number;
    points: number;
    totalRuns: number;
    totalDistance: number;
    rank: number;
    isCurrentUser: boolean;
};

type Category = {
    month: LeaderboardEntry[];
    year: LeaderboardEntry[];
    alltime: LeaderboardEntry[];
};

export type LeaderboardData = {
    points: Category;
    runs: Category;
};
