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

export default function AdminAppLayout({children, name, surname, email, isAdmin}: AuthLayoutProps) {
    const segment = useSelectedLayoutSegment();


    const segmentMap: Record<string, { headerTitle: string; activeItemId: string }> = {
        //admin
        adminEvent: {headerTitle: "Gestione eventi", activeItemId: "admin/event"},
        adminUser: {headerTitle: "Gestione utenti", activeItemId: "admin/user"},

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
