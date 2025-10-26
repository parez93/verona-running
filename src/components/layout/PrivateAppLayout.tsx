"use client";

import AppLayout from "@/components/layout/AppLayout";
import {useSelectedLayoutSegment} from "next/navigation";
import {ReactNode} from "react";

interface AuthLayoutProps {
    children: ReactNode,
    name?: string,
    surname?: string,
    email?: string,
    isAdmin?: boolean
}

export default function PrivateAppLayout({children, name, surname, email, isAdmin}: AuthLayoutProps) {
    const segment = useSelectedLayoutSegment();

    const segmentMap: Record<string, { headerTitle: string; activeItemId: string }> = {
        dashboard: {headerTitle: "Dashboard", activeItemId: "dashboard"},
        account: {headerTitle: "Account Settings", activeItemId: "account"},
        event: {headerTitle: "Eventi", activeItemId: "event"},
        bug_report: {headerTitle: `Segnala un Bug`, activeItemId: "bug_report"},
    };

    const {headerTitle, activeItemId} = segmentMap[segment || "dashboard"] || {
        headerTitle: "App",
        activeItemId: "dashboard",
    };

    return (
        <AppLayout headerTitle={headerTitle} name={name} surname={surname} email={email} isAdmin={isAdmin}>
            {children}
        </AppLayout>
    );
}
