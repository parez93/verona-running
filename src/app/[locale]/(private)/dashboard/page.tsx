"use client";

import NextEventSection from "@/components/dashboard/NextEventSection";
import type {Layouts, ResponsiveProps} from "react-grid-layout";
import {Responsive, WidthProvider} from "react-grid-layout";
import {useEffect, useMemo, useState} from "react";
import {Button} from "@/components/ui/button";
import {DashboardData} from "@/types/models/dashboard";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import {SkeletonCard} from "@/components/layout/SkeletonCard";
import {dashboardDataAct} from "@/app/[locale]/(private)/dashboard/actions";
import {useTranslations} from "next-intl"; // ✅ import next-intl

const ResponsiveGridLayout = WidthProvider(Responsive);

const STORAGE_KEY = "dashboard_layouts_v1";

// Default layouts for all breakpoints
const defaultLayouts: Layouts = {
    lg: [
        /*
                { i: "stats", x: 6, y: 0, w: 6, h: 9 },
        */
        {i: "welcome", x: 0, y: 0, w: 5, h: 4.7, isResizable: false},
        {i: "next-event", x: 9, y: 0, w: 7, h: 13},
        /*        { i: "enrolled", x: 0, y: 6, w: 7, h: 9 },
                { i: "notifications", x: 8, y: 6, w: 4, h: 11 },
                { i: "suggestions", x: 0, y: 14, w: 7, h: 9 },*/
    ],
    md: [
        /*        { i: "stats", x: 0, y: 0, w: 5, h: 6 },*/
        {i: "welcome", x: 0, y: 0, w: 5, h: 5.2, isResizable: false},
        {i: "next-event", x: 6, y: 0, w: 5, h: 14},
        /*       { i: "enrolled", x: 0, y: 6, w: 6, h: 8 },
               { i: "notifications", x: 6, y: 6, w: 4, h: 8 },
               { i: "suggestions", x: 0, y: 14, w: 10, h: 6 },*/
    ],
    sm: [
        /*        { i: "stats", x: 0, y: 0, w: 8, h: 6 },*/
        {i: "welcome", x: 0, y: 0, w: 9, h: 5.2, isResizable: false},

        {i: "next-event", x: 1, y: 6, w: 8, h: 13},
        /*        { i: "enrolled", x: 0, y: 12, w: 8, h: 8 },
                { i: "notifications", x: 0, y: 20, w: 8, h: 8 },
                { i: "suggestions", x: 0, y: 28, w: 8, h: 6 },*/
    ],
    xs: [
        /*
                { i: "stats", x: 0, y: 0, w: 6, h: 6 },
        */
        {i: "welcome", x: 0, y: 0, w: 9, h: 5.2, isResizable: false},

        {i: "next-event", x: 1, y: 6, w: 6, h: 14},
        /*        { i: "enrolled", x: 0, y: 12, w: 6, h: 8 },
                { i: "notifications", x: 0, y: 20, w: 6, h: 8 },
                { i: "suggestions", x: 0, y: 28, w: 6, h: 6 },*/
    ],
    xxs: [
        /*
                { i: "stats", x: 0, y: 0, w: 4, h: 6 },
        */
        {i: "welcome", x: 2, y: 0, w: 9, h: 4.5, isResizable: false},

        {i: "next-event", x: 0, y: 6, w: 4, h: 16},
        /*        { i: "enrolled", x: 0, y: 12, w: 4, h: 8 },
                { i: "notifications", x: 0, y: 20, w: 4, h: 8 },
                { i: "suggestions", x: 0, y: 28, w: 4, h: 6 },*/
    ],
};

function loadLayouts(): Layouts {
    try {
        const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        if (!raw) return defaultLayouts;
        const parsed = JSON.parse(raw) as Layouts;
        return parsed && Object.keys(parsed).length ? parsed : defaultLayouts;
    } catch {
        return defaultLayouts;
    }
}

function saveLayouts(layouts: Layouts) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts));
    } catch {
    }
}

export default function RunnerDashboardPage() {
    const t = useTranslations("dashboard.page"); // ✅ hook per le traduzioni
    const [layouts, setLayouts] = useState<Layouts>(() => defaultLayouts);
    const [mounted, setMounted] = useState(false);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await dashboardDataAct()
                setDashboardData(data);
                setLayouts(loadLayouts());
                setMounted(true);
            } catch (err) {
                console.error("Error fetching dashboard", err);
            } finally {
            }
        };

        fetchEvents();
    }, []);

    const breakpoints = useMemo<ResponsiveProps["breakpoints"]>(
        () => ({lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}),
        []
    );

    const cols = useMemo<ResponsiveProps["cols"]>(
        () => ({lg: 12, md: 10, sm: 8, xs: 6, xxs: 4}),
        []
    );

    const onLayoutsChange = (newLayouts: Layouts) => {
        setLayouts(newLayouts);
        saveLayouts(newLayouts);
    };

    // Prevent mismatch on SSR by rendering an initial non-grid placeholder
    if (!mounted) {
        return (
            <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <SkeletonCard title={t("skeleton.stats")}/>
                <SkeletonCard title={t("skeleton.nextEvent")}/>
                <SkeletonCard title={t("skeleton.enrolled")}/>
                <SkeletonCard title={t("skeleton.notifications")}/>
                <SkeletonCard title={t("skeleton.suggestions")}/>
            </div>
        );
    }

/*
    console.log('dashboardData', dashboardData);
*/

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
                <Button variant="secondary" onClick={() => {
                    setLayouts(defaultLayouts);
                    saveLayouts(defaultLayouts);
                }}>
                    {t("resetLayout")}
                </Button>
                <span className="text-sm text-muted-foreground">{t("tip")}</span>
            </div>

            <ResponsiveGridLayout
                className="layout"
                draggableHandle=".drag-handle"
                rowHeight={30}
                margin={[16, 16]}
                containerPadding={[0, 0]}
                isBounded
                breakpoints={breakpoints}
                cols={cols}
                layouts={layouts}
                onLayoutChange={(_, allLayouts) => onLayoutsChange(allLayouts)}   // ✅
                measureBeforeMount={false}
                compactType="vertical"
                preventCollision={false}
            >
                {/*
                <div key="stats" className="rgl-card">
                        <StatsSection />
                </div>
*/}
                {dashboardData != null && dashboardData.nextEvent != null &&  dashboardData.nextEvent.id != null && (
                    <div key="next-event" className="rgl-card">
                        <NextEventSection nextEvent={dashboardData!.nextEvent}/>
                    </div>
                )}
                <div key="welcome" className="rgl-card">
                    <WelcomeSection user={dashboardData!.user} stats={dashboardData!.stats}/>
                </div>
                {/*                <div key="enrolled" className="rgl-card">
                        <EnrolledEventsSection />
                </div>

                <div key="notifications" className="rgl-card">
                        <NotificationSection />
                </div>

                <div key="suggestions" className="rgl-card">
                        <SuggestionsSection />
                </div>*/}
            </ResponsiveGridLayout>
        </div>
    );
}
