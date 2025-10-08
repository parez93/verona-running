"use client";

import AppLayout from "@/components/shared/AppLayout";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";
import {fetchUserCookieAction} from "@/app/(auth)/actions";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const segment = useSelectedLayoutSegment();

    const segmentMap: Record<string, { headerTitle: string; activeItemId: string }> = {
        //admin
        events: { headerTitle: "Gestione eventi", activeItemId: "adminEvents" },
        users: { headerTitle: "Gestione utenti", activeItemId: "adminUsers" },

    };

    const { headerTitle, activeItemId } = segmentMap[segment || "dashboard"] || {
        headerTitle: "App",
        activeItemId: "dashboard",
    };

    return (
        <AppLayout headerTitle={headerTitle}>
            {children}
        </AppLayout>
    );
}
