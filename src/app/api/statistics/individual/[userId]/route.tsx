import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser()

        // --- Check if user exists ---
        const { data: userExists, error: userError } = await supabase
            .from('psn_data')
            .select('id')
            .eq('id', user?.id)
            .limit(1);

        if (userError) throw userError;
        if (!userExists || userExists.length === 0) {
            return NextResponse.json(
                { error: 'User not found', code: 'USER_NOT_FOUND' },
                { status: 404 }
            );
        }

        // --- Fetch all user event data (checked-in + with completion_time) ---
        const { data: registrations, error: regError } = await supabase
            .from('evt_registration')
            .select(`
/*
        completion_time,
*/
/*
        checked_in,
*/
        evt_data (
          distance,
          datetime
        )
      `)
            .eq('id_user', user?.id)
/*
            .eq('checked_in', true)
*/
/*
            .not('completion_time', 'is', null);
*/

        if (regError) throw regError;

        if (!registrations || registrations.length === 0) {
            return NextResponse.json({
                userId: user?.id,
                averageTimeByDistance: {},
                averagePaceOverTime: [],
                monthlyKmProgression: [],
                personalBests: {},
            });
        }

        // Helper per estrarre distanza e data
        const cleanData = registrations
            .filter((r) => r.evt_data && r.evt_data.distance
/*
                && r.completion_time
*/
            )
            .map((r) => ({
                distance: r.evt_data.distance,
                datetime: new Date(r.evt_data.datetime),
/*
                completionTime: r.completion_time,
*/
            }));

        // --- 1. Average completion time by distance ---
        const distanceGroups: Record<string, number[]> = {};
        for (const row of cleanData) {
            const d = row.distance.toString();
            if (!distanceGroups[d]) distanceGroups[d] = [];
            distanceGroups[d].push(row.completionTime);
        }

        const averageTimeByDistance: Record<string, number> = {};
        for (const [distance, times] of Object.entries(distanceGroups)) {
            const avgSeconds =
                times.reduce((sum, t) => sum + t, 0) / (times.length || 1);
            averageTimeByDistance[distance] = Math.round((avgSeconds / 60) * 100) / 100; // minuti
        }

        // --- 2. Average pace over time (monthly) ---
        const monthGroups: Record<string, number[]> = {};
        const paceGroups: Record<string, number[]> = {};

        for (const row of cleanData) {
            const month = row.datetime.toISOString().slice(0, 7); // "YYYY-MM"
            const pace = row.completionTime / row.distance / 60; // min/km
            if (!paceGroups[month]) paceGroups[month] = [];
            paceGroups[month].push(pace);
        }

        const averagePaceOverTime = Object.entries(paceGroups)
            .map(([month, paces]) => ({
                month,
                avgPace:
                    Math.round(
                        (paces.reduce((a, b) => a + b, 0) / paces.length) * 100
                    ) / 100,
            }))
            .sort((a, b) => a.month.localeCompare(b.month));

        // --- 3. Monthly km progression ---
        for (const row of cleanData) {
            const month = row.datetime.toISOString().slice(0, 7);
            if (!monthGroups[month]) monthGroups[month] = [];
            monthGroups[month].push(row.distance);
        }

        const monthlyKmProgression = Object.entries(monthGroups)
            .map(([month, distances]) => ({
                month,
                totalKm:
                    Math.round(distances.reduce((a, b) => a + b, 0) * 100) / 100,
            }))
            .sort((a, b) => a.month.localeCompare(b.month));

        // --- 4. Personal bests (min completion time by distance) ---
        const personalBests: Record<string, number> = {};
        for (const [distance, times] of Object.entries(distanceGroups)) {
            personalBests[distance] = Math.min(...times);
        }

        // --- Response ---
        return NextResponse.json({
            userId: user?.id,
            averageTimeByDistance,
            averagePaceOverTime,
            monthlyKmProgression,
            personalBests,
        });
    } catch (error) {
        console.error('GET individual statistics error:', error);
        return NextResponse.json(
            {
                error:
                    'Internal server error: ' +
                    (error instanceof Error ? error.message : 'Unknown error'),
            },
            { status: 500 }
        );
    }
}
