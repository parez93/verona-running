"use client";

import { useState, useEffect, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Breadcrumb {
    label: string;
    href?: string;
}

interface AppLayoutProps {
    children: ReactNode;
    headerTitle: string;
    breadcrumbs?: Breadcrumb[];
}

export default function AppLayout({
                                      children,
                                      headerTitle,
                                      breadcrumbs = [],
                                  }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Rileva se siamo su mobile
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // Chiudi la sidebar quando si passa a desktop
            if (!mobile) {
                setSidebarOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Chiudi sidebar quando si clicca sull'overlay
    const closeSidebar = () => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    // Chiudi sidebar dopo la navigazione su mobile
    const handleNavigate = () => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Mobile Sidebar Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <Sidebar
                className={`
          ${
                    isMobile
                        ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
                            sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`
                        : "fixed left-0 top-0 h-full z-20"
                }
        `}
                onNavigate={handleNavigate}
            />

            {/* Main Content Area */}
            <div className={`flex flex-col min-h-screen ${!isMobile ? "ml-64" : ""}`}>
                {/* Header */}
                <Header
                    title={headerTitle}
                    breadcrumbs={breadcrumbs}
                    className="sticky top-0 z-10"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    showMenuButton={isMobile}
                />

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6">
                    <div className="max-w-10xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
