"use client";

import {useState, useEffect, ReactNode} from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {UserFromCookie} from "@/utils/supabase/getUserFromCookie";

interface AppLayoutProps {
    children: ReactNode,
    headerTitle: string,
    activeItemId?: string
}


export default function AppLayout({children, headerTitle, activeItemId}: AppLayoutProps) {
    const [currentPage, setCurrentPage] = useState<"account" | "404">("account");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(false); // Close mobile sidebar on desktop
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Close sidebar when clicking outside on mobile
    const closeSidebar = () => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Sidebar Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                className={`
          ${isMobile
                    ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`
                    : 'fixed left-0 top-0 h-full z-20'
                }
        `}
                activeItemId={activeItemId}
            />

            {/* Main Content Area */}
            <div className={`flex flex-col min-h-screen ${!isMobile ? 'ml-64' : ''}`}>
                {/* Header */}
                <Header
                    title={headerTitle}
                    breadcrumbs={[
                        {label: "Dashboard", href: "/"},
                        {label: "Account Setting"}
                    ]}
                    className="sticky top-0 z-10"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    showMenuButton={isMobile}
                />

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        {/*<AccountSettings />*/}
                        {children}
                    </div>
                </main>
            </div>

            {/* Demo Navigation (for testing 404 page) */}
            {/*            <div className="fixed bottom-4 right-4 z-30">
                <div className="flex flex-col gap-2 md:flex-row">
                    <button
                        onClick={() => setCurrentPage("account")}
                        className={`px-3 py-2 text-xs rounded-md transition-colors ${
                            currentPage === "account"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                        Account
                    </button>
                    <button
                        onClick={() => setCurrentPage("404")}
                        className={`px-3 py-2 text-xs rounded-md transition-colors ${
                            currentPage === "404"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                        404 Page
                    </button>
                </div>
            </div>*/}
        </div>
    );
}
