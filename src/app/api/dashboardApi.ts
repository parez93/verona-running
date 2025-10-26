import {createSupabaseServerClient} from "@/lib/supabase/server";
import {DashboardData} from "@/types/models/dashboard";

export async function dashboardData(): Promise<DashboardData | { error: string }> {
    const supabase = await createSupabaseServerClient();

    try {
        const {data} = await supabase.auth.getUser();
        const userId = data.user?.id;
        if (!userId) return {error: "Missing user id"};

        const {data: user, error: userError} = await supabase
            .from("psn_data")
            .select("*")
            .eq("id", userId)
            .single();

        if (userError) return {error: userError.message};

        // --- Recupera prossimo evento dell'utente ---
        const now = new Date().toISOString();
/*        const {data: registrations, error: regError} = await supabase
            .from("evt_registration")
            .select("*, evt_data(*)")
            .eq("id_user", userId)
            .gt("evt_data.datetime", now) // solo eventi futuri*/

        const {data: registrations, error: regError} = await supabase
            .from("evt_data")
            .select(`*, evt_registration(id_user)`)
            .gt("datetime", now)
            .order("datetime", {ascending: true})
            .limit(1);

        if (regError) return {error: regError.message};

        const event = registrations?.[0];
        const isRegistered = event?.evt_registration?.some(
            (reg: any) => reg.id_user === userId
        );

        const nextEvent = {
            ...event,
            is_registered: isRegistered,
        };

        // --- Calcola statistiche ---
        const {data: allRegs, error: allRegsError} = await supabase
            .from("evt_registration")
            .select("*, evt_data(datetime, id, distance)")
            .eq("id_user", userId)

        if (allRegsError) return {error: allRegsError.message};

        // Filtra solo eventi passati
        const pastRegs = allRegs.filter(r =>
            r.evt_data && new Date(r.evt_data.datetime) < new Date(now)
        );

        const eventsRun = pastRegs.length;
        const kmRun = pastRegs.reduce(
            (sum, r) => sum + (r.evt_data?.distance ?? 0),
            0
        );

        return {
            user,
            nextEvent,
            stats: {eventsRun, kmRun},
        };
    } catch (err: any) {
        return {error: err.message ?? "Unknown error"};
    }
}
