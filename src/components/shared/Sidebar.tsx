"use client";

import { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen,
    Menu,
    LayoutPanelLeft,
    PanelRight,
    PanelRightClose,
    PanelLeftDashed,
    PanelRightDashed, CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/constants/routes";
import Image from "next/image";


interface SidebarProps {
    className?: string;
    activeItemId?: string;
}

interface MenuItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    children?: Omit<MenuItem, 'children'>[];
}

// Using available icons as placeholders for dashboard functionality
const menuItems: MenuItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutPanelLeft,
        href: '/dashboard'
    },
    {
        id: 'events',
        label: 'Eventi',
        icon: CalendarDays,
        href: ROUTES.events()
    },/*    {
        id: 'settings',
        label: 'Settings',
        icon: Menu,
        children: [
            { id: 'general', label: 'General', icon: Menu, href: '/settings/general' },
            { id: 'security', label: 'Security', icon: Menu, href: '/settings/security' },
            { id: 'notifications', label: 'Notifications', icon: Menu, href: '/settings/notifications' }
        ]
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: PanelRight,
        href: '/analytics'
    },
    {
        id: 'billing',
        label: 'Billing',
        icon: PanelRightClose,
        href: '/billing'
    },
    {
        id: 'users',
        label: 'User Management',
        icon: PanelLeftDashed,
        children: [
            { id: 'all-users', label: 'All Users', icon: Menu, href: '/users' },
            { id: 'roles', label: 'Roles & Permissions', icon: Menu, href: '/users/roles' }
        ]
    },
    {
        id: 'integrations',
        label: 'Integrations',
        icon: PanelRightDashed,
        href: '/integrations'
    }*/

];

const MenuIcon = ({ className }: { className?: string }) => <Menu className={className} />;

export default function Sidebar({ className = "", activeItemId = 'dashboard'}: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [activeItem, setActiveItem] = useState(activeItemId);
    const router = useRouter();

    const toggleCollapsed = () => {
        setIsCollapsed(!isCollapsed);
        if (!isCollapsed) {
            setExpandedItems([]);
        }
    };

    const toggleExpanded = (itemId: string) => {
        if (isCollapsed) return;

        setExpandedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleItemClick = (item: MenuItem, hasChildren: undefined | boolean) => {
        if (hasChildren) {
            toggleExpanded(item.id);
        } else {
            setActiveItem(item.id);
            router.push(item.href!)
        }
    };

    const renderMenuItem = (item: MenuItem, isChild = false) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.id);
        const isActive = activeItem === item.id;
        const IconComponent = item.icon;

        return (
            <div key={item.id} className={isChild ? "ml-2 md:ml-4" : ""}>
                <button
                    onClick={() => handleItemClick(item, hasChildren)}
                    className={`
            w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-sm font-medium
            transition-all duration-200 group
            ${isActive
                        ? "bg-[var(--color-sidebar-item-active-fill)] border border-[var(--color-sidebar-item-active-border)] text-[var(--color-sidebar-primary)]"
                        : "text-[var(--color-sidebar-foreground)] hover:bg-[var(--color-sidebar-accent)] hover:text-[var(--color-sidebar-accent-foreground)]"
                    }
            ${isChild ? "text-xs" : ""}
          `}
                >
                    <IconComponent
                        className={`
              ${isCollapsed ? "w-4 h-4 md:w-5 md:h-5" : "w-4 h-4"} 
              flex-shrink-0
              ${isActive ? "text-[var(--color-sidebar-primary)]" : "text-[var(--color-icon-secondary)]"}
              group-hover:text-[var(--color-sidebar-accent-foreground)]
            `}
                    />

                    {!isCollapsed && (
                        <>
              <span className="flex-1 text-left truncate text-xs md:text-sm">
                {item.label}
              </span>

                            {hasChildren && (
                                <div className="flex-shrink-0">
                                    {isExpanded ? (
                                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-[var(--color-icon-secondary)]" />
                                    ) : (
                                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-[var(--color-icon-secondary)]" />
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </button>

                {hasChildren && isExpanded && !isCollapsed && (
                    <div className="mt-1 space-y-1">
                        {item.children!.map(child => renderMenuItem(child, true))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={`
        bg-[var(--color-sidebar)] border-r border-[var(--color-sidebar-border)]
        transition-all duration-300 ease-in-out flex flex-col
        ${isCollapsed ? "w-12 md:w-16" : "w-56 md:w-64"}
        ${className}
      `}
        >
            {/* Header */}
            <div className="h-17 flex items-center justify-between p-2 md:p-4 border-b border-[var(--color-sidebar-border)]">
                {/* Desktop & tablet: logo + testo */}
                <div className="hidden sm:flex items-center gap-2 flex-1 justify-center">
                    <Image
                        src="/verona_running_logo.png" // qui metti il tuo file immagine
                        alt="Verona Running"
                        width={120}
                        height={32}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Mobile: logo solo, occupa tutto lo spazio */}
                <div className="flex sm:hidden flex-1 justify-center">
                    <Image
                        src="/verona_running_logo.png" // qui metti il tuo file immagine
                        alt="Verona Running"
                        width={120}
                        height={32}
                        className="object-contain"
                        priority
                    />
                </div>



                {/* Hide collapse button on mobile - controlled by main layout */}
{/*                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCollapsed}
                    className={`
            hidden md:flex p-1 md:p-2 hover:bg-[var(--color-sidebar-accent)] text-[var(--color-sidebar-foreground)]
            ${isCollapsed ? "w-6 h-6 md:w-8 md:h-8" : "w-6 h-6 md:w-8 md:h-8"}
          `}
                >
                    {isCollapsed ? (
                        <PanelLeftOpen className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                        <PanelLeftClose className="w-3 h-3 md:w-4 md:h-4" />
                    )}
                </Button>*/}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-2 md:p-2 space-y-1 md:space-y-2 overflow-y-auto">
                {menuItems.map(item => renderMenuItem(item))}
            </nav>

            {/* Footer */}
            {!isCollapsed && (
                <div className="p-2 md:p-4 border-t border-[var(--color-sidebar-border)]">
                    <div className="text-xs text-[var(--color-text-light)]">
                        Version 0.1.0
                    </div>
                </div>
            )}
        </div>
    );
}
