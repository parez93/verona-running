import { NextResponse } from 'next/server';
import { createSupabaseServerClient, getSupabaseUser } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createSupabaseServerClient();
    const user = await getSupabaseUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;
    const now = new Date();

    try {
        // ===================================================
        // 🏆 POINTS (XP)
        // ===================================================
        const { data: gamificationData, error: gamError } = await supabase
            .from('vw_user_gamification')
            .select('id_user, name, surname, img_base64, total_xp, unlocked_badges, level, level_icon, level_color');

        if (gamError) throw gamError;

        const mapPoints = (data: any[]) =>
            data
                .sort((a, b) => (b.total_xp ?? 0) - (a.total_xp ?? 0))
                .map((u, i) => ({
                    id: u.id_user,
                    name: `${u.name ?? ''}`.trim(),
                    surname: u.surname[0] ?? '',
                    avatar: u.img_base64,
                    badges: u.unlocked_badges ?? 0,
                    points: u.total_xp ?? 0,
                    totalRuns: 0,
                    totalDistance: 0,
                    rank: i + 1,
                    isCurrentUser: userId === u.id_user,
                }));

        // Non hai timestamp degli XP → i filtri temporali restituiranno la stessa lista
        const points = {
            month: mapPoints(gamificationData),
            year: mapPoints(gamificationData),
            alltime: mapPoints(gamificationData),
        };

        // ===================================================
        // 🏃‍♂️ RUNS (EVENTI)
        // ===================================================
        const { data: registrations, error: regError } = await supabase
            .from('evt_registration')
            .select(`
        id_user,
        evt_data ( datetime, distance ),
        psn_data ( name, surname, img_base64 )
      `);

        if (regError) throw regError;
        if (!registrations) return NextResponse.json({ points, runs: { month: [], year: [], alltime: [] } });

        // funzione di aggregazione
        const aggregateRuns = (data: typeof registrations) => {
            const userMap = new Map<string, {
                id_user: string;
                name: string;
                surname: string;
                img_base64: string | null;
                totalRuns: number;
                totalDistance: number;
            }>();

            for (const r of data) {
                if (!r.id_user || !r.psn_data) continue;
                const existing = userMap.get(r.id_user);
                const evt = r.evt_data as unknown as { distance: number; datetime: string };
                const distance = evt.distance ?? 0;

                if (existing) {
                    existing.totalRuns += 1;
                    existing.totalDistance += distance;
                } else {
                    const psn = r.psn_data as unknown as {
                        name: string;
                        surname: string;
                        img_base64: string;
                    };
                    userMap.set(r.id_user, {
                        id_user: r.id_user,
                        name: psn.name,
                        surname: psn.surname[0],
                        img_base64: psn.img_base64,
                        totalRuns: 1,
                        totalDistance: distance,
                    });
                }
            }

            return Array.from(userMap.values())
                .sort((a, b) => b.totalRuns - a.totalRuns)
                .map((u, i) => ({
                    id: u.id_user,
                    name: `${u.name}`,
                    surname: u.surname[0],
                    avatar: u.img_base64,
                    totalRuns: u.totalRuns,
                    totalDistance: u.totalDistance,
                    badges: 0,
                    points: 0,
                    rank: i + 1,
                    isCurrentUser: userId === u.id_user,
                }));
        };

        const runsAll = registrations;
        const runsMonth = registrations.filter((r) => {
            const evt = r.evt_data as unknown as { distance: number; datetime: string };
            if (!evt?.datetime) return false;
            const d = new Date(evt.datetime);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        const runsYear = registrations.filter((r) => {
            const evt = r.evt_data as unknown as { distance: number; datetime: string };
            if (!evt?.datetime) return false;
            const d = new Date(evt.datetime);
            return d.getFullYear() === now.getFullYear();
        });

        const runs = {
            month: aggregateRuns(runsMonth),
            year: aggregateRuns(runsYear),
            alltime: aggregateRuns(runsAll),
        };

        // ===================================================
        // ✅ Risposta unica
        // ===================================================
        return NextResponse.json({ points, runs });
    } catch (error: any) {
        console.error('Leaderboard fetch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
