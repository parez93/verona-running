import { Card } from "@/components/ui/card";
import { Account } from "@/api/account/account";

interface WelcomeSectionProps {
    user?: Account | null;
}

export default function WelcomeSection({ user }: WelcomeSectionProps) {
    return (
        <section className="h-full overflow-hidden border-border/60 rounded-[var(--radius)] border bg-card text-card-foreground shadow-sm">
            <Card className="relative overflow-hidden rounded-[var(--radius)] bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white border-0 shadow-2xl">
                <div className="pl-8 pe-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 md:mb-2 sm:mb-8">
                        <div>
                            <p className="text-lg sm:text-xl md:text-3xl font-semibold">
                                Bentornato
                            </p>
                            <p className="text-lg sm:text-xl md:text-3xl font-bold">{user?.name}</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10 pr-20 sm:pr-24 md:pr-0">
                        <div className="space-y-1 sm:space-y-2">
                            <p className="text-white/80 text-xs sm:text-sm md:text-base">Eventi corsi</p>
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{'2224'}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2 pl-10">
                            <p className="text-white/80 text-xs sm:text-sm md:text-base">Km corsi</p>
                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{'1234567'}</p>
                        </div>
                    </div>

                    {/* 3D Image - Responsive positioning */}
                    <div
                        className={`
              p-4 absolute
              right-2 top-2 w-40 h-40     /* posizione su mobile */
              sm:bottom-4 sm:top-auto sm:w-32 sm:h-32 /* posizione su tablet */
              md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-40 md:h-40 /* posizione su desktop */
              lg:w-56 lg:h-56
              opacity-90
              transition-all
            `}
                    >
                        <img
                            src="/images/welcome.svg"
                            alt="Running decoration"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </Card>
        </section>
    );
}
