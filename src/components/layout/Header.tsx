"use client";

import {startTransition, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Globe, LogOut, Menu, User} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {ROUTES} from "@/lib/kRoutes";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { useLocale } from "next-intl";

interface HeaderProps {
    title?: string,
    breadcrumbs?: { label: string; href?: string }[],
    className?: string,
    onMenuClick?: () => void,
    showMenuButton?: boolean,
    name?: string,
    surname?: string,
    email?: string
}

export default function Header({
                                   title = "Account Settings",
                                   breadcrumbs = [
                                       {label: "Dashboard", href: "/"},
                                       {label: "Account Settings"}
                                   ],
                                   className = "",
                                   onMenuClick,
                                   showMenuButton = false,
                                   name,
                                   surname,
                                   email
                               }: HeaderProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationCount] = useState(3);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();


    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        // Theme toggle implementation would go here
    };

    function goAccountPage() {
        router.push('/account');
    }

    const handleLogout = () => {

        startTransition(async () => {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });
            if (res.ok) router.push(ROUTES.signin());
            else console.error("Logout failed");
        });
    };

    function changeLanguage(newLocale: string) {
        document.cookie = `lang=${newLocale}; path=/; max-age=31536000`; // 1 anno

        const segments = pathname.split("/");

        // se il path è /it/event o /en/event → sostituisci il secondo segmento
        if (segments[1] === "it" || segments[1] === "en") {
            segments[1] = newLocale;
        } else {
            // se manca il locale (es. /event), aggiungilo
            segments.unshift(newLocale);
        }

        const newPath = segments.join("/");
        router.push(newPath);
    }

    return (
        <header className={`w-full bg-card border-b border-border-subtle px-4 md:px-6 py-4 ${className}`}>
            <div className="flex items-center justify-between">
                {/* Left Section - Mobile Menu + Title and Breadcrumbs */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Mobile Menu Button */}
                    {showMenuButton && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 md:hidden"
                            onClick={onMenuClick}
                        >
                            <Menu className="h-5 w-5"/>
                        </Button>
                    )}

                    <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h1 className="text-lg md:text-xl font-semibold text-foreground mb-1 truncate">
                            {title}
                        </h1>

                        {/* Breadcrumbs */}
                        {/*                        <nav className="hidden sm:flex items-center space-x-1 text-sm text-muted-foreground">
                            {breadcrumbs.map((crumb, index) => (
                                <div key={index} className="flex items-center">
                                    {index > 0 && (
                                        <span className="mx-2 text-border">/</span>
                                    )}
                                    {crumb.href ? (
                                        <a
                                            href={crumb.href}
                                            className="hover:text-foreground transition-colors duration-200 truncate"
                                        >
                                            {crumb.label}
                                        </a>
                                    ) : (
                                        <span className="text-foreground truncate">{crumb.label}</span>
                                    )}
                                </div>
                            ))}
                        </nav>*/}
                    </div>
                </div>

                {/* Right Section - Controls */}
                <div className="flex items-center gap-1 md:gap-3">
                    {/* Search Button - Hidden on mobile */}
                    {/*                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden sm:flex h-9 w-9 p-0 hover:bg-muted transition-colors duration-200"
                    >
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </Button>*/}

                    {/* Language Selector - Hidden on mobile */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden sm:flex h-9 w-9 p-0 hover:bg-muted transition-colors duration-200"
                            >
                                <Globe className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Language</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => changeLanguage('it')}>🇮🇹 Italiano</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeLanguage('en')}>🇺🇸 English</DropdownMenuItem>
{/*                            <DropdownMenuItem>🇪🇸 Español</DropdownMenuItem>
                            <DropdownMenuItem>🇫🇷 Français</DropdownMenuItem>
                            <DropdownMenuItem>🇩🇪 Deutsch</DropdownMenuItem>*/}
                        </DropdownMenuContent>
                    </DropdownMenu>


                    {/* Theme Toggle - Hidden on mobile */}
                    {/*                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="hidden sm:flex h-9 w-9 p-0 hover:bg-muted transition-colors duration-200"
                    >
                        {isDarkMode ? (
                            <Sun className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Moon className="h-4 w-4 text-muted-foreground" />
                        )}
                    </Button>*/}

                    {/* Notifications */}
                    {/*                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative h-9 w-9 p-0 hover:bg-muted transition-colors duration-200"
                            >
                                <Bell className="h-4 w-4 text-muted-foreground" />
                                {notificationCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 text-xs flex items-center justify-center"
                                    >
                                        {notificationCount > 9 ? '9+' : notificationCount}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-72 md:w-80">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex flex-col items-start p-3">
                                <div className="font-medium">New message received</div>
                                <div className="text-sm text-muted-foreground">2 minutes ago</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start p-3">
                                <div className="font-medium">Profile updated successfully</div>
                                <div className="text-sm text-muted-foreground">1 hour ago</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start p-3">
                                <div className="font-medium">Security alert</div>
                                <div className="text-sm text-muted-foreground">3 hours ago</div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>*/}

                    {/* User Avatar Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-primary">
                                <Avatar
                                    className="AvatarRoot w-9 h-9 rounded-full overflow-hidden bg-primary">
                                    <AvatarImage
                                        className="AvatarImage"
                                        src={''}
                                        alt="Colm Tuite"
                                    />
                                    <AvatarFallback className="AvatarFallback bg-primary text-background text-sm"
                                                    delayMs={600}>
                                        {(name?.charAt(0).toUpperCase() || "A")}
                                        {(surname?.charAt(0).toUpperCase() || "Z")}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="px-2 py-1.5">
                                <div
                                    className="font-medium">{name || 'Nome'} {surname || 'Cognome'}</div>
                                <div className="text-sm text-muted-foreground">{email}</div>
                            </div>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={goAccountPage}>
                                <User className="mr-2 h-4 w-4"/>
                                Profilo
                            </DropdownMenuItem>
                            {/*                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </DropdownMenuItem>*/}
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="text-destructive focus:text-destructive"
                                              onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4"/>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
