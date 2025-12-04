"use client";

import {useEffect, useState} from "react";
import {BellIcon, BugOffIcon, CalendarDays, ChevronDown, ChevronRight, LayoutPanelLeft, UsersIcon,} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import {ROUTES} from "@/lib/kRoutes";
import {TooltipProvider,} from "@/components/ui/tooltip";
import {SUPPORTED_LOCALES} from "@/lib/kLocale";

interface SidebarProps {
    className?: string;
    onNavigate?: () => void;
    isAdmin?: boolean;
}

interface MenuItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    children?: Omit<MenuItem, "children">[];
}


const menuItems: MenuItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutPanelLeft,
        href: ROUTES.dashboard(),
    },
    {
        id: "event",
        label: "Eventi",
        icon: CalendarDays,
        href: ROUTES.event(),
    },
    {
        id: "adminEvent",
        label: "Gestione eventi",
        icon: CalendarDays,
        href: ROUTES.adminEvent(),
    },
    {
        id: "adminUser",
        label: "Gestione utenti",
        icon: UsersIcon,
        href: ROUTES.adminUser(),
    },
    {
        id: "adminNotification",
        label: "Gestione Notifiche",
        icon: BellIcon,
        href: ROUTES.adminNotification(),
    },
];

export default function Sidebar({
                                    className = "",
                                    onNavigate,
                                    isAdmin = false,
                                }: SidebarProps) {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const [version, setVersion] = useState("")

    useEffect(() => {
        const fetchVersion = async () => {

            const res = await fetch("/api/version");
            const {version} = await res.json();
            setVersion(version);
        }
        fetchVersion();
    }, [version]);



    const baseMenuItems: MenuItem[] = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: LayoutPanelLeft,
            href: ROUTES.dashboard(),
        },
        {
            id: "event",
            label: "Eventi",
            icon: CalendarDays,
            href: ROUTES.event(),
        },
    ];

    // 👇 aggiungi i menu admin solo se isAdmin è true
    const adminMenuItems: MenuItem[] = isAdmin
        ? [
            {
                id: "adminEvent",
                label: "Gestione eventi",
                icon: CalendarDays,
                href: ROUTES.adminEvent(),
            },
            {
                id: "adminUser",
                label: "Gestione utenti",
                icon: UsersIcon,
                href: ROUTES.adminUser(),
            },
            {
                id: "adminNotification",
                label: "Gestione notifiche",
                icon: BellIcon,
                href: ROUTES.adminNotification(),
            },
        ]
        : [];

    const menuItems = [...baseMenuItems, ...adminMenuItems];

    // Sincronizza l'elemento attivo con l'URL corrente (considera rotte figlie)
/*
    useEffect(() => {
        let foundMatch = false;

        // Cerca tra gli elementi principali
        for (const item of menuItems) {
            if (item.href && pathname.startsWith(item.href)) {
                setActiveItem(item.id);
                foundMatch = true;
                break;
            }

            // Cerca tra i children
            if (item.children) {
                for (const child of item.children) {
                    if (child.href && pathname.startsWith(child.href)) {
                        setActiveItem(child.id);
                        // Espandi automaticamente il parent
                        if (!expandedItems.includes(item.id)) {
                            setExpandedItems((prev) => [...prev, item.id]);
                        }
                        foundMatch = true;
                        break;
                    }
                }
            }

            if (foundMatch) break;
        }

        // Se non c'è corrispondenza, nessun elemento è selezionato
        if (!foundMatch) {
            setActiveItem(null);
        }
    }, [pathname]);
*/

    useEffect(() => {
        // Rimuove il prefisso lingua se presente
        const segments = pathname.split('/');
        const pathWithoutLocale = SUPPORTED_LOCALES.includes(segments[1])
            ? '/' + segments.slice(2).join('/')
            : pathname;

        let foundMatch = false;

        for (const item of menuItems) {
            if (item.href && pathWithoutLocale.startsWith(item.href)) {
                setActiveItem(item.id);
                foundMatch = true;
                break;
            }

            if (item.children) {
                for (const child of item.children) {
                    if (child.href && pathWithoutLocale.startsWith(child.href)) {
                        setActiveItem(child.id);
                        if (!expandedItems.includes(item.id)) {
                            setExpandedItems((prev) => [...prev, item.id]);
                        }
                        foundMatch = true;
                        break;
                    }
                }
            }

            if (foundMatch) break;
        }

        if (!foundMatch) setActiveItem(null);
    }, [pathname]);


    const toggleExpanded = (itemId: string) => {
        setExpandedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleItemClick = (item: MenuItem, hasChildren?: boolean) => {
        if (hasChildren) {
            toggleExpanded(item.id);
        } else {
            setActiveItem(item.id);
            if (item.href) {
                router.push(item.href);

                // Notifica il parent della navigazione (per chiudere sidebar su mobile)
                if (onNavigate) {
                    onNavigate();
                }
            }
        }
    };

    const renderMenuItem = (item: MenuItem, isChild = false) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.id);
        const isActive = activeItem === item.id;
        const IconComponent = item.icon;

        const buttonContent = (
            <button
                onClick={() => handleItemClick(item, hasChildren)}
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-200 group/item
          ${
                    isActive
                        ? "bg-[var(--color-sidebar-item-active-fill)] border border-[var(--color-sidebar-item-active-border)] text-[var(--color-sidebar-primary)]"
                        : "text-[var(--color-sidebar-foreground)] hover:bg-[var(--color-sidebar-accent)] hover:text-[var(--color-sidebar-accent-foreground)]"
                }
          ${isChild ? "text-xs py-2" : ""}
        `}
            >
                <IconComponent
                    className={`
            w-4 h-4 flex-shrink-0
            ${isActive ? "text-[var(--color-sidebar-primary)]" : "text-[var(--color-icon-secondary)]"}
            group-hover/item:text-[var(--color-sidebar-accent-foreground)]
          `}
                    aria-hidden="true"
                />

                <span className="flex-1 text-left truncate">{item.label}</span>

                {hasChildren && (
                    <div className="flex-shrink-0" aria-hidden="true">
                        {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[var(--color-icon-secondary)]" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-[var(--color-icon-secondary)]" />
                        )}
                    </div>
                )}
            </button>
        );

        return (
            <div key={item.id} className={isChild ? "ml-4" : ""}>
                {buttonContent}

                {hasChildren && isExpanded && (
                    <div className="mt-1 space-y-1">
                        {item.children!.map((child) => renderMenuItem(child, true))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={`
          bg-[var(--color-sidebar)] border-r border-[var(--color-sidebar-border)]
          transition-all duration-300 ease-in-out flex flex-col h-screen w-64
          ${className}
        `}
                aria-label="Navigazione principale"
            >
                {/* Header */}
                <header className="h-17 flex items-center justify-center p-4 border-b border-[var(--color-sidebar-border)]">
                    <Image
                        src="/images/verona_running_logo.png"
                        alt="Verona Running"
                        width={120}
                        height={32}
                        className="object-contain"
                        priority
                    />
                </header>

                {/* Navigation Menu */}
                <nav
                    className="flex-1 p-2 space-y-2 overflow-y-auto"
                    aria-label="Menu principale"
                >
                    {menuItems.map((item) => renderMenuItem(item))}
                </nav>

                {renderMenuItem({
                    id: "bug_report",
                    label: "Segnala un Bug",
                    icon: BugOffIcon,
                    href: "/bug_report",
                })}

                {/* Footer */}
                <footer className="p-4 border-t border-[var(--color-sidebar-border)]">
                    <div className="text-xs text-[var(--color-text-light)]">
                        Version {version}
                    </div>
                </footer>
            </aside>
        </TooltipProvider>
    );
}
