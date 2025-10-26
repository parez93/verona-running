"use client";

import {Button} from "@/components/ui/button";
import {ServerCrash} from "lucide-react";
import Link from "next/link";
import {ROUTES} from "@/lib/kRoutes";

export default function NotFound({}) {
    return (
        // global-error must include html and body tags
        <html>
        <body>
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    {/* Main 404 Background */}
                    <div
                        className="text-[clamp(120px,20vw,240px)] font-bold text-transparent bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text select-none">
                        404
                    </div>

                    {/* Character and Decorative Elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Server Crash Icon as Main Character */}

                            <div
                                className="text-[clamp(120px,20vw,240px)] font-bold text-transparent bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text select-none
                                w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">

                                404
                            </div>

                            {/* Decorative Elements */}
                            <div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
                            <div
                                className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                            <div
                                className="absolute top-8 -left-8 w-3 h-3 bg-purple-300 rounded-full animate-pulse"></div>
                            <div
                                className="absolute top-8 -right-8 w-3 h-3 bg-pink-300 rounded-full animate-pulse delay-500"></div>
                        </div>
                    </div>
                </div>

                {/* ERROR Text */}
                <div className="mb-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tracking-wider">
                        ERROR
                    </h1>
                </div>

                {/* Opps!!! Heading */}
                <div className="mb-6">
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                        Opps!!!
                    </h2>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                        We're sorry, but the page you're looking for could not be found.
                        It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                </div>

                {/* Go Back Button */}
                <div>
                    <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Link href={ROUTES.dashboard()}>
                            Go Back to Home
                        </Link>
                    </Button>
                </div>

                {/* Additional Decorative Elements */}
                <div
                    className="absolute top-20 left-10 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
                <div
                    className="absolute top-32 right-16 w-3 h-3 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                <div
                    className="absolute bottom-20 left-20 w-2 h-2 bg-purple-200 rounded-full animate-pulse delay-700 opacity-60"></div>
                <div
                    className="absolute bottom-32 right-24 w-2 h-2 bg-pink-200 rounded-full animate-bounce delay-1000 opacity-60"></div>
            </div>
        </div>
        </body>
        </html>
    );
}
