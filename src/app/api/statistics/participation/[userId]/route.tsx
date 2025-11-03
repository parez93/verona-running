import { NextRequest, NextResponse } from 'next/server';
import {createSupabaseServerClient, getSupabaseUser} from '@/lib/supabase/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const supabase = await createSupabaseServerClient();
/*
        const { userId } = await params;
*/
        const parsedUserId = await getSupabaseUser();
        // --- Validate userId ---
/*
        if (!userId || isNaN(parseInt(userId))) {
            return NextResponse.json(
                { error: 'Valid user ID is required', code: 'INVALID_USER_ID' },
                { status: 400 }
            );
        }
        const parsedUserId = parseInt(userId);
*/

        // --- Check if user exists ---
/*        const { data: user, error: userError } = await supabase
            .from('psn_data')
            .select('id, created_at')
            .eq('id', parsedUserId)
            .limit(1)
            .single();

        if (userError && userError.code !== 'PGRST116') throw userError;
        if (!user) {
            return NextResponse.json(
                { error: 'User not found', code: 'USER_NOT_FOUND' },
                { status: 404 }
            );
        }

        const userCreatedAt = user.created_at;*/
        const userCreatedAt = parsedUserId?.created_at

        // --- Fetch all events for this user ---
/*        const { data: registrations, error: regError } = await supabase
            .from('evt_registration')
            .select(`
        checked_in,
        id_user,
        evt_data (
          id,
          datetime,
          event_type
        )
      `)
            .eq('id_user', parsedUserId);*/
        const { data: registrations, error: regError } = await supabase
            .from('evt_registration')
            .select(`
        id_user,
        evt_data (
          id,
          datetime
        )
      `)
            .eq('id_user', parsedUserId?.id);

        if (regError) throw regError;

        // Filter only valid ones with joined evt_data
        const validRegistrations = registrations?.filter(
            (r) => r.evt_data && r.evt_data.datetime
        ) ?? [];

        // --- 1. Events completed over time (monthly) ---
/*
        const completed = validRegistrations.filter((r) => r.checked_in);
*/
        const completed = validRegistrations;
        const monthlyGroups: Record<string, number> = {};
        for (const row of completed) {
            const month = new Date(row.evt_data.datetime).toISOString().slice(0, 7); // YYYY-MM
            monthlyGroups[month] = (monthlyGroups[month] || 0) + 1;
        }

        const eventsCompletedOverTime = Object.entries(monthlyGroups)
            .map(([month, count]) => ({ month, count }))
            .sort((a, b) => a.month.localeCompare(b.month));

        // --- 2. Weekly & Monthly frequency ---
        let weeklyFrequency = 0;
        let monthlyFrequency = 0;

        if (completed.length > 0) {
            const sorted = completed
                .map((r) => new Date(r.evt_data.datetime))
                .sort((a, b) => a.getTime() - b.getTime());
            const first = sorted[0];
            const last = sorted[sorted.length - 1];
            const totalEvents = completed.length;

            const diffDays =
                (last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
            if (diffDays > 0) {
                const weeks = diffDays / 7;
                const months = diffDays / 30.44;
                weeklyFrequency = parseFloat((totalEvents / Math.max(weeks, 1)).toFixed(2));
                monthlyFrequency = parseFloat(
                    (totalEvents / Math.max(months, 1)).toFixed(2)
                );
            } else {
                weeklyFrequency = totalEvents;
                monthlyFrequency = totalEvents;
            }
        }

        // --- 3. Participation ratio ---
        const totalRegisteredEvents = validRegistrations.length;

        // Total events available since user joined
        const { data: allEvents, error: allEventsError } = await supabase
            .from('evt_data')
            .select('id, datetime')
            .gte('datetime', userCreatedAt);

        if (allEventsError) throw allEventsError;

        const totalEventsAvailable = allEvents?.length ?? 0;

        let participationRatio = 0;
        if (totalEventsAvailable > 0) {
            participationRatio = parseFloat(
                ((totalRegisteredEvents / totalEventsAvailable) * 100).toFixed(2)
            );
        }

        // --- 4. Most frequent event types ---
        const typeCounts: Record<string, number> = {};
        for (const row of validRegistrations) {
            const type = row.evt_data.event_type || 'Unknown';
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        }

        const mostFrequentEventTypes = Object.entries(typeCounts)
            .map(([eventType, count]) => ({ eventType, count }))
            .sort((a, b) => b.count - a.count);

        // --- Response ---
        return NextResponse.json(
            {
                userId: parsedUserId?.id,
                eventsCompletedOverTime,
                weeklyFrequency,
                monthlyFrequency,
                participationRatio,
                mostFrequentEventTypes,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('GET error:', error);
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
