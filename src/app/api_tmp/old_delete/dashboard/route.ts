import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Tables } from "@/types/database";

type PsnData = Tables<"psn_data">;
type EvtData = Tables<"evt_data">;
type EvtRegistration = Tables<"evt_registration">;

export async function GET(req: NextRequest) {
    const supabase = await createSupabaseServerClient();

    try {
        // --- Recupera utente loggato (session) ---
        const userId = req.headers.get("x-user-id"); // esempio: passare user id nell'header
        if (!userId) return NextResponse.json({ error: "Missing user id" }, { status: 401 });

        const { data: user, error: userError } = await supabase
            .from("psn_data")
            .select("*")
            .eq("id", userId)
            .single();

        if (userError) return NextResponse.json({ error: userError.message }, { status: 400 });

        // --- Recupera prossimo evento dell'utente ---
        const { data: registrations, error: regError } = await supabase
            .from("evt_registration")
            .select("*, evt_data(*)")
            .eq("id_user", userId)
            .order("id", { ascending: true }); // puoi ordinare per datetime evt_data.datetime se vuoi

        if (regError) return NextResponse.json({ error: regError.message }, { status: 400 });

        const nextEvent = registrations?.[0]?.evt_data
            ? {
                ...registrations[0].evt_data,
                is_registered: true,
                registration_id: registrations[0].id,
            }
            : null;

        // --- Calcola statistiche ---
        const { data: allRegs, error: allRegsError } = await supabase
            .from("evt_registration")
            .select("*, evt_data(datetime, id)")
            .eq("id_user", userId);

        if (allRegsError) return NextResponse.json({ error: allRegsError.message }, { status: 400 });

        const eventsRun = allRegs.length;
        // kmRun supponiamo distanza in evt_data.distance (opzionale)
        const kmRun = allRegs.reduce((sum, r) => sum + (r.evt_data?.distance ?? 0), 0);

        return NextResponse.json({
            user,
            nextEvent,
            stats: { eventsRun, kmRun },
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 500 });
    }
}
