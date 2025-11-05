import { NextResponse } from 'next/server';
import {
    getISOWeek,
    getISOWeekYear,
    parseISO,
    getISOWeeksInYear,
} from 'date-fns';
import { createSupabaseServerClient, getSupabaseUser } from "@/lib/supabase/server";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    const supabase = await createSupabaseServerClient();
    const user = await getSupabaseUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;

    // JOIN registrations + events
    const { data: registrations, error } = await supabase
        .from('evt_registration')
        .select('created_at, id_event, evt_data(distance, datetime)')
        .eq('id_user', userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (!registrations?.length) {
        return NextResponse.json({
            totalRuns: 0,
            totalDistance: 0,
            monthlyKm: [],
            monthlyPoints: [],
            currentStreak: 0,
            longestStreak: 0,
            streakWeeks: [],
        });
    }

    // Flatten events (assicurati che evt_data.datetime sia ISO)
    const runs = registrations.map((r) => ({
        date: parseISO(r.evt_data.datetime),
        distance: r.evt_data.distance,
    }));

    // Corse totali e distanza
    const totalRuns = runs.length;
    const totalDistance = runs.reduce((sum, r) => sum + r.distance, 0);

    // === Km e punti per mese (ultimi 6 mesi con mesi vuoti) ===
    const monthlyMap = new Map<string, { km: number; points: number }>();
    for (const r of runs) {
        const key = `${r.date.getFullYear()}-${r.date.getMonth() + 1}`;
        const prev = monthlyMap.get(key) || { km: 0, points: 0 };
        prev.km += r.distance;
        prev.points += Math.round(r.distance * 4);
        monthlyMap.set(key, prev);
    }

    const monthsSorted = Array.from(monthlyMap.keys())
        .map((k) => {
            const [y, m] = k.split('-').map(Number);
            return new Date(y, m - 1);
        })
        .sort((a, b) => a.getTime() - b.getTime());

    const firstMonth = monthsSorted[0];
    const lastMonth = monthsSorted[monthsSorted.length - 1];

    const allMonths: { month: string; year: number; km: number; points: number }[] = [];
    const cursor = new Date(firstMonth);
    while (cursor <= lastMonth) {
        const key = `${cursor.getFullYear()}-${cursor.getMonth() + 1}`;
        const existing = monthlyMap.get(key);
        allMonths.push({
            month: cursor.toLocaleString('it', { month: 'short' }),
            year: cursor.getFullYear(),
            km: existing?.km ?? 0,
            points: existing?.points ?? 0,
        });
        cursor.setMonth(cursor.getMonth() + 1);
    }

    const monthly = allMonths.slice(-6);

    // === Costruisco set di settimane ISO (annoISO-week) dove ha corso almeno una volta ===
    const weekSet = new Set<string>();
    runs.forEach((r) => {
        const isoYear = getISOWeekYear(r.date);
        const isoWeek = getISOWeek(r.date);
        weekSet.add(`${isoYear}-${isoWeek}`);
    });

    // === Calcolo longestStreak ===
    // Ordino le settimane presenti (per annoISO, per week)
    const weeksArray = Array.from(weekSet).map((key) => {
        const [y, w] = key.split('-').map(Number);
        return { year: y, week: w };
    }).sort((a, b) => (a.year - b.year) || (a.week - b.week));

    let longestStreak = 0;
    let tempStreak = 0;
    let prevYear = null as number | null;
    let prevWeek = null as number | null;

    for (const item of weeksArray) {
        if (prevYear === null) {
            tempStreak = 1;
        } else {
            // calcola se item è settimana successiva a prev
            const prevYearWeeks = getISOWeeksInYear(prevYear);
            const isNext =
                (item.year === prevYear && item.week === prevWeek! + 1) ||
                (item.year === prevYear + 1 && prevWeek === prevYearWeeks && item.week === 1);
            if (isNext) {
                tempStreak++;
            } else {
                // reset temporaneo
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
            }
        }
        prevYear = item.year;
        prevWeek = item.week;
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // === Calcolo currentStreak (con riferimento a ISO-week/year correnti) ===
    const now = new Date();
    const currentIsoYear = getISOWeekYear(now);
    const currentIsoWeek = getISOWeek(now);

    let currentStreak = 0;
    // se non ha corso la settimana corrente, streak = 0
    if (!weekSet.has(`${currentIsoYear}-${currentIsoWeek}`)) {
        currentStreak = 0;
    } else {
        // conta a ritroso
        currentStreak = 0;
        let y = currentIsoYear;
        let w = currentIsoWeek;
        while (weekSet.has(`${y}-${w}`)) {
            currentStreak++;
            // decrementa settimana considerando il wrapping dell'anno ISO
            w = w - 1;
            if (w <= 0) {
                y = y - 1;
                w = getISOWeeksInYear(y);
            }
        }
    }

    // === Lista completa delle settimane dell'anno ISO corrente (1..N) ===
    const weeksInCurrentIsoYear = getISOWeeksInYear(currentIsoYear);
    const streakWeeks: { week: number; active: boolean }[] = [];
    for (let i = 1; i <= weeksInCurrentIsoYear; i++) {
        streakWeeks.push({ week: i, active: weekSet.has(`${currentIsoYear}-${i}`) });
    }

    return NextResponse.json({
        totalRuns,
        totalDistance,
        monthlyKm: monthly.map((m) => ({ month: m.month, year: m.year, km: m.km })),
        monthlyPoints: monthly.map((m) => ({ month: m.month, year: m.year, points: m.points })),
        currentStreak,
        longestStreak,
        streakWeeks,
    });
}
