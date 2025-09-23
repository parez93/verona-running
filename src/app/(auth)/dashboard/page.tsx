import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    MapPin,
    Clock,
    ExternalLink,
    PencilLine,
    BadgeCheck,
    CheckCircle2,
    Clock8,
    CreditCard,
    Bell,
    AlertTriangle,
    CloudRain,
    Trophy,
    Timer,
    TrendingUp,
    Users,
    ArrowRight,
} from "lucide-react";
import NextEventSection from "@/components/dashboard/NextEventSection";
import EnrolledEventsSection from "@/components/dashboard/EnrolledEventsSection";
import NotificationSection from "@/components/dashboard/NotificationSection";
import StatsSection from "@/components/dashboard/StatsSection";
import SuggestionsSection from "@/components/dashboard/SuggestionsSection";

export default function RunnerDashboardPage() {
    return (
        <div className="min-h-dvh">
            {/* Page header */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">La tua dashboard</h1>
                    <p className="text-sm text-muted-foreground">Panoramica rapida degli eventi, statistiche e notifiche.</p>
                </div>
            </div>

            <main className="container mx-auto px-4 pb-16 md:pb-24">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left column: Next event + Enrolled events */}
                    <div className="space-y-6 xl:col-span-2">
                        {/* Next Event */}
                        <NextEventSection/>

                        {/* Enrolled Events */}
                        <EnrolledEventsSection/>
                    </div>

                    {/* Right column: Notifications + Stats + Suggestions */}
                    <div className="space-y-6">
                        {/* Notifications */}
                        <NotificationSection/>

                        {/* Stats */}
                        <StatsSection/>

                        {/* Suggestions */}
                        <SuggestionsSection/>
                    </div>
                </div>
            </main>
        </div>
    );
}
