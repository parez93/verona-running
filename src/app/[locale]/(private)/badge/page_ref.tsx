'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import {Achievement, allAchievements, leaderboardData} from './gamification-data';
import {Card} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Lock, TrendingUp, Trophy} from 'lucide-react';
import BadgeCelebration from '@/components/badge/BadgeCelebration';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function AchievementsPage() {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

    const unlockedAchievements = allAchievements.filter(a => a.unlocked);
    const lockedAchievements = allAchievements.filter(a => !a.unlocked);

    const filteredAchievements =
        filter === 'all'
            ? allAchievements
            : filter === 'unlocked'
                ? unlockedAchievements
                : lockedAchievements;

    // Get current user data
    const currentUserData = leaderboardData.find(u => u.name === 'Tu');
    const userPoints = currentUserData?.points || 1200;

    // Level system based on points
    const levels = [
        {level: 1, minPoints: 0, maxPoints: 19, icon: '🏃', color: 'from-gray-400 to-gray-600'},
        {level: 2, minPoints: 20, maxPoints: 39, icon: '⭐', color: 'from-blue-400 to-blue-600'},
        {level: 3, minPoints: 40, maxPoints: 79, icon: '💪', color: 'from-purple-400 to-purple-600'},
        {
            level: 4,
            minPoints: 80,
            maxPoints: 159,
            icon: '🔥',
            color: 'from-orange-400 to-orange-600'
        },
        {
            level: 5,
            minPoints: 160,
            maxPoints: 319,
            icon: '🏆',
            color: 'from-yellow-400 to-yellow-600'
        },
        {
            level: 6,
            minPoints: 320,
            maxPoints: Infinity,
            icon: '👑',
            color: 'from-cyan-400 to-purple-600'
        },
    ];

    const getCurrentLevel = () => {
        return levels.find(l => userPoints >= l.minPoints && userPoints <= l.maxPoints) || levels[0];
    };

    const getNextLevel = () => {
        const currentLevel = getCurrentLevel();
        return levels.find(l => l.level === currentLevel.level + 1);
    };

    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    const pointsToNext = nextLevel ? nextLevel.minPoints - userPoints : 0;
    const progressPercentage = nextLevel
        ? ((userPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
        : 100;

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'bronze':
                return 'from-amber-600 to-amber-800';
            case 'silver':
                return 'from-gray-400 to-gray-600';
            case 'gold':
                return 'from-yellow-400 to-yellow-600';
            case 'platinum':
                return 'from-cyan-400 to-blue-600';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        className="text-center mb-6"
                    >
                        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                            <Trophy className="h-10 w-10 text-yellow-500"/>
                            Achievements
                        </h1>
                        <p className="text-muted-foreground">
                            {unlockedAchievements.length} di {allAchievements.length} sbloccati
                        </p>
                    </motion.div>

                    {/* Level Progress Card */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.1}}
                    >
                        <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-2 border-primary/20">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Level Medal/Icon */}
                                <motion.div
                                    className="relative"
                                    initial={{scale: 0, rotate: -180}}
                                    animate={{scale: 1, rotate: 0}}
                                    transition={{type: 'spring', duration: 0.8, delay: 0.2}}
                                >
                                    <div
                                        className={`w-32 h-32 rounded-full bg-gradient-to-br ${currentLevel.color} flex items-center justify-center text-6xl shadow-2xl border-4 border-background`}>
                                        {/*{currentLevel.icon}*/}
                                        <Avatar
                                            className={`AvatarRoot w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br ${currentLevel.color}`}>
                                            <AvatarImage
                                                className="AvatarImage"
                                                src={currentUserData?.img_base64 || undefined}
                                                alt="Colm Tuite"
                                            />
                                            <AvatarFallback
                                                className={`AvatarFallback w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br ${currentLevel.color}`}
                                                delayMs={600}>
                                                {currentUserData?.name?.charAt(0).toUpperCase()}{currentUserData?.surname?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                    </div>
                                    <motion.div
                                        className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-lg"
                                        initial={{scale: 0}}
                                        animate={{scale: 1}}
                                        transition={{delay: 0.5, type: 'spring'}}
                                    >
                                        <div
                                            className="h-5 w-5 text-center text-primary-foreground">{currentLevel.icon}</div>
                                    </motion.div>
                                </motion.div>

                                {/* Points and Progress Info */}
                                <div className="flex-1 w-full">
                                    {/* Points Display */}
                                    <motion.div
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.3}}
                                        className="mb-4"
                                    >
                                        <p className="text-4xl font-bold mb-1">
                                            {currentUserData?.name || 'Marco'}
                                        </p>
                                        {nextLevel ? (
                                            <p className="text-sm text-muted-foreground">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Livello {currentLevel.level} • {userPoints.toLocaleString('it-IT')} punti</p>
                                                </div>
                                            </p>
                                        ) : (
                                            <p className="text-sm text-yellow-500 font-semibold">
                                                🎉 Hai raggiunto il livello massimo!
                                            </p>
                                        )}
                                    </motion.div>

                                    {/* Progress Bar */}
                                    {nextLevel && (
                                        <motion.div
                                            initial={{opacity: 0, y: 10}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.4}}
                                        >
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span
                                                    className="font-semibold">Progresso verso Livello {nextLevel.level}</span>
                                                <span className="text-muted-foreground font-semibold">
                          {Math.round(progressPercentage)}%
                        </span>
                                            </div>
                                            <div className="relative overflow-hidden rounded-full">
                                                <Progress
                                                    value={progressPercentage}
                                                    className="h-4 bg-muted"
                                                />
                                                <motion.div
                                                    className="absolute inset-0 h-4 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    animate={{
                                                        x: ['-100%', '200%'],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: 'linear',
                                                    }}
                                                    style={{width: '50%'}}
                                                />
                                            </div>
                                            <div
                                                className="flex items-center justify-between text-xs mt-2 text-muted-foreground">
                                                <span>Ti mancano <span
                                                    className="font-semibold text-foreground">{pointsToNext}</span> punti al prossimo livello</span>
                                                <span>{nextLevel.minPoints} pts</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Filters */}
                <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                        <TabsTrigger value="all">Tutti ({allAchievements.length})</TabsTrigger>
                        <TabsTrigger value="unlocked">Sbloccati ({unlockedAchievements.length})</TabsTrigger>
                        <TabsTrigger value="locked">Bloccati ({lockedAchievements.length})</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Achievements Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                >
                    {filteredAchievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.05}}
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.98}}
                        >
                            <Card
                                className={`p-6 cursor-pointer transition-all ${
                                    achievement.unlocked
                                        ? 'hover:shadow-lg'
                                        : 'opacity-60 hover:opacity-80'
                                }`}
                                onClick={() => achievement.unlocked && setSelectedAchievement(achievement)}
                            >
                                <div className={`relative mb-4 ${!achievement.unlocked ? 'grayscale' : ''}`}>
                                    <div
                                        className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${getTierColor(
                                            achievement.tier
                                        )} flex items-center justify-center text-4xl shadow-lg`}
                                    >
                                        {achievement.unlocked ? (
                                            achievement.icon
                                        ) : (
                                            <Lock className="h-8 w-8 text-white"/>
                                        )}
                                    </div>
                                    {achievement.unlocked && (
                                        <motion.div
                                            className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                                            initial={{scale: 0}}
                                            animate={{scale: 1}}
                                            transition={{delay: 0.3}}
                                        >
                                            <Trophy className="h-4 w-4 text-white"/>
                                        </motion.div>
                                    )}
                                </div>

                                <h3 className="font-bold text-center mb-2">{achievement.name}</h3>
                                <p className="text-sm text-muted-foreground text-center mb-3">
                                    {achievement.description}
                                </p>

                                <div className="flex items-center justify-center mb-3">
                                    <Badge
                                        variant="outline"
                                        className={`capitalize bg-gradient-to-r ${getTierColor(achievement.tier)} text-white border-0`}
                                    >
                                        {achievement.tier}
                                    </Badge>
                                </div>

                                {!achievement.unlocked && (
                                    <div>
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">Progresso</span>
                                            <span className="font-semibold">{achievement.progress}%</span>
                                        </div>
                                        <Progress value={achievement.progress} className="h-2"/>
                                    </div>
                                )}

                                {achievement.unlocked && achievement.unlockedAt && (
                                    <p className="text-xs text-muted-foreground text-center mt-2">
                                        Sbloccato il {new Date(achievement.unlockedAt).toLocaleDateString('it-IT')}
                                    </p>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Celebration Modal */}
            <BadgeCelebration
                achievement={selectedAchievement}
                onClose={() => setSelectedAchievement(null)}
            />
        </div>
    );
}
