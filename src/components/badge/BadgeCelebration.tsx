'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from './gamification-data';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import {UserBadges} from "@/types/models/badge";

interface BadgeCelebrationProps {
    achievement: UserBadges | null;
    onClose: () => void;
}

export default function BadgeCelebration({ achievement, onClose }: BadgeCelebrationProps) {
    if (!achievement) return null;

    const getTierColor = (tier: string | null) => {
        switch (tier) {
            case 'bronze': return 'from-amber-600 to-amber-800';
            case 'silver': return 'from-gray-400 to-gray-600';
            case 'gold': return 'from-yellow-400 to-yellow-600';
            case 'platinum': return 'from-cyan-400 to-blue-600';
            default: return 'from-gray-400 to-gray-600';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', duration: 0.7 }}
                    className="relative max-w-md mx-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Confetti particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: [0, 1, 1, 0],
                                x: Math.cos((i / 20) * Math.PI * 2) * 250,
                                y: Math.sin((i / 20) * Math.PI * 2) * 250,
                            }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][i % 5],
                            }}
                        />
                    ))}

                    {/* Main card */}
                    <motion.div
                        className={`relative bg-gradient-to-br ${getTierColor(achievement.tier)} p-1 rounded-2xl shadow-2xl`}
                    >
                        <div className="bg-card rounded-xl p-8 text-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={onClose}
                            >
                                <X className="h-4 w-4" />
                            </Button>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-8xl mb-4"
                            >
                                {achievement.icon}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-3xl font-bold mb-2"
                            >
                                Badge Sbloccato! 🎉
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <h3 className="text-xl font-semibold mb-2 capitalize">
                                    {achievement.name}
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    {achievement.description}
                                </p>

                                <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${getTierColor(achievement.tier)} text-white font-semibold uppercase text-sm`}>
                                    {achievement.tier}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <Button onClick={onClose} className="mt-6 w-full">
                                    Fantastico!
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
