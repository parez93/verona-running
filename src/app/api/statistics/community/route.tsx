import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
    try {
        const supabase = await createSupabaseServerClient();

        // --- Boundaries for current month ---
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const startOfMonthISO = startOfMonth.toISOString();
        const endOfMonthISO = endOfMonth.toISOString();

        // --- 1. Runner Level Distribution ---
/*        const { data: runnerLevelData, error: runnerLevelError } = await supabase
            .from('psn_data')
            .select('runner_level, id');*/

        const { data: runnerLevelData, error: runnerLevelError } = await supabase
            .from('psn_data')
            .select('id');

        if (runnerLevelError) throw runnerLevelError;

/*        const levelCounts: Record<string, number> = {};
        for (const row of runnerLevelData ?? []) {
            const level = row.runner_level || 'unknown';
            levelCounts[level] = (levelCounts[level] || 0) + 1;
        }*/

       /* const totalUsers = Object.values(levelCounts).reduce((sum, c) => sum + c, 0);*/
        const totalUsers = 10;

/*        const runnerLevelDistribution = Object.entries(levelCounts).map(([level, count]) => ({
            level,
            count,
            percentage: totalUsers > 0 ? Number(((count / totalUsers) * 100).toFixed(2)) : 0,
        }));*/

        // --- 2. Average km per user this month ---
        const { data: kmData, error: kmError } = await supabase
            .from('evt_registration')
            .select('evt_data(distance, datetime)')
/*
            .eq('checked_in', true)
*/
            .gte('evt_data.datetime', startOfMonthISO)
            .lte('evt_data.datetime', endOfMonthISO);

        if (kmError) throw kmError;

        const totalDistanceThisMonth =
            kmData?.reduce((sum, r) => sum + (r.evt_data?.distance || 0), 0) || 0;
        const avgKmPerUserThisMonth =
            totalUsers > 0 ? Number((totalDistanceThisMonth / totalUsers).toFixed(2)) : 0;

        // --- 3. Total time run by club (in hours) ---
/*        const { data: totalTimeData, error: totalTimeError } = await supabase
            .from('evt_registration')
            .select('completion_time')
/!*
            .eq('checked_in', true);
*!/

        if (totalTimeError) throw totalTimeError;

        const totalTimeInSeconds =
            totalTimeData?.reduce((sum, r) => sum + (r.completion_time || 0), 0) || 0;
        const totalTimeRunByClub = Number((totalTimeInSeconds / 3600).toFixed(2));*/

        // --- 4. Total events ---
        const { count: totalEvents, error: totalEventsError } = await supabase
            .from('evt_data')
            .select('id', { count: 'exact', head: true });

        if (totalEventsError) throw totalEventsError;

        // --- 5. Total participants (distinct users registered) ---
        const { data: participantsData, error: participantsError } = await supabase
            .from('evt_registration')
            .select('id_user');

        if (participantsError) throw participantsError;

        const uniqueUsers = new Set(participantsData?.map(r => r.id_user));
        const totalParticipants = uniqueUsers.size;

        // --- 6. Total completed events (distinct events with checked_in = true) ---
        const { data: completedData, error: completedError } = await supabase
            .from('evt_registration')
            .select('id_event')
/*
            .eq('checked_in', true);
*/

        if (completedError) throw completedError;

        const uniqueCompleted = new Set(completedData?.map(r => r.id_event));
        const totalCompletedEvents = uniqueCompleted.size;

        // --- Response ---
        return NextResponse.json(
            {
/*
                runnerLevelDistribution,
*/
                avgKmPerUserThisMonth,
/*
                totalTimeRunByClub,
*/
                totalEvents: totalEvents ?? 0,
                totalParticipants,
                totalCompletedEvents,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown') },
            { status: 500 }
        );
    }
}
