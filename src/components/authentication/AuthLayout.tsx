import React, { ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex">
            {/* Left Column - Form Area */}
            <div className="flex-1 flex items-center justify-center p-4 bg-white lg:p-8">
                <div className="w-full max-w-md space-y-6">
                    {children}
                </div>
            </div>

            {/* Right Column - Branding/Promotional Content */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center p-8 relative overflow-hidden" style={{ backgroundColor: 'var(--color-dark-background)' }}>
                {/* Background Pattern/Decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-white/20"></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border border-white/20"></div>
                    <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full border border-white/20"></div>
                    <div className="absolute bottom-10 left-1/3 w-12 h-12 rounded-full border border-white/20"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 space-y-8 max-w-lg">
                    {/* Logo/Brand */}
                    <div className="space-y-4">
{/*                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl" style={{ backgroundColor: 'var(--color-dark-accent)' }}>
                            <svg
                                className="w-8 h-8 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z"/>
                            </svg>
                        </div>*/}
                        <h1
                            className="text-5xl font-bold tracking-tight"
                            style={{ color: 'var(--color-dark-foreground)', fontFamily: 'var(--font-heading)' }}
                        >
                            Benvenuto in
                        </h1>
                        <h1
                            className="text-5xl font-bold tracking-tight"
                            style={{ color: 'var(--color-dark-foreground)', fontFamily: 'var(--font-heading)' }}
                        >
                            Verona Running
                        </h1>
                    </div>

                    {/* Promotional Content */}
                    <div className="space-y-6">
{/*                        <h2
                            className="text-2xl font-semibold leading-tight"
                            style={{ color: 'var(--color-dark-foreground)', fontFamily: 'var(--font-heading)' }}
                        >
                            Transform Your Data Into Actionable Insights
                        </h2>*/}

                        <p
                            className="text-lg leading-relaxed opacity-90"
                            style={{ color: 'var(--color-text-lighter)', fontFamily: 'var(--font-body)' }}
                        >
                            La prima community di Verona con appuntamento settimanale aperta a tutti e adatta ai runners di qualsiasi livello.
                        </p>


                        {/* Feature List */}
{/*
                        <div className="space-y-4 text-left">
                            <div className="flex items-center space-x-3">
                                <div
                                    className="flex-shrink-0 w-2 h-2 rounded-full"
                                    style={{ backgroundColor: 'var(--color-dark-accent)' }}
                                ></div>
                                <span
                                    className="text-sm"
                                    style={{ color: 'var(--color-text-lighter)', fontFamily: 'var(--font-body)' }}
                                >
                  Real-time analytics and reporting
                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div
                                    className="flex-shrink-0 w-2 h-2 rounded-full"
                                    style={{ backgroundColor: 'var(--color-dark-accent)' }}
                                ></div>
                                <span
                                    className="text-sm"
                                    style={{ color: 'var(--color-text-lighter)', fontFamily: 'var(--font-body)' }}
                                >
                  Customizable dashboard templates
                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div
                                    className="flex-shrink-0 w-2 h-2 rounded-full"
                                    style={{ backgroundColor: 'var(--color-dark-accent)' }}
                                ></div>
                                <span
                                    className="text-sm"
                                    style={{ color: 'var(--color-text-lighter)', fontFamily: 'var(--font-body)' }}
                                >
                  Secure data integration
                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div
                                    className="flex-shrink-0 w-2 h-2 rounded-full"
                                    style={{ backgroundColor: 'var(--color-dark-accent)' }}
                                ></div>
                                <span
                                    className="text-sm"
                                    style={{ color: 'var(--color-text-lighter)', fontFamily: 'var(--font-body)' }}
                                >
                  Collaborative team workspaces
                </span>
                            </div>
                        </div>
*/}
                    </div>

                    {/* Call to Action */}
{/*                    <div className="pt-8">
                        <p
                            className="text-sm opacity-75"
                            style={{ color: 'var(--color-text-lighter)', fontFamily: 'var(--font-body)' }}
                        >
                            Trusted by 10,000+ businesses worldwide
                        </p>
                    </div>*/}
                </div>

                {/* Additional Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            </div>
        </div>
    )
}
