"use client";

import { useState, useEffect } from "react";
import {
    ChevronDown,
    ChevronRight,
    LayoutPanelLeft,
    CalendarDays,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
    className?: string;
    onNavigate?: () => void;
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
        href: "/dashboard",
    },
    {
        id: "events",
        label: "Eventi",
        icon: CalendarDays,
        href: ROUTES.events(),
    },
];

export default function Sidebar({
                                    className = "",
                                    onNavigate,
                                }: SidebarProps) {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Sincronizza l'elemento attivo con l'URL corrente (considera rotte figlie)
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
                        src="/verona_running_logo.png"
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

                {/* Footer */}
                <footer className="p-4 border-t border-[var(--color-sidebar-border)]">
                    <div className="text-xs text-[var(--color-text-light)]">
                        Version 0.1.0
                    </div>
                </footer>
            </aside>
        </TooltipProvider>
    );
}
