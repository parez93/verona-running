// /app/api/notifications/route.ts
import {NextRequest, NextResponse} from "next/server";
import { getNotificationsForUser } from "@/app/api/notificationApi";
import {createSupabaseServerClient} from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);

        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        const psnId = user?.id;
        const limit = parseInt(url.searchParams.get("limit") || "100", 10);

        if (!psnId) {
            return NextResponse.json({ error: "psnId is required" }, { status: 400 });
        }

        const notifications = await getNotificationsForUser(psnId, limit);

        return NextResponse.json({ data: notifications });
    } catch (err: any) {
        console.error("GET /api/notifications error", err);
        return NextResponse.json(
            { error: err?.message ?? "Internal error" },
            { status: 500 }
        );
    }
}



export async function PATCH() {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const psnId = user.id;

// Step 1: prendi gli ntf_id associati a questo psn
        const { data: psnNtf, error: psnErr } = await supabase
            .from("psn_ntf")
            .select("ntf_id")
            .eq("psn_id", psnId);

        const ntfIds = psnNtf?.map(n => n.ntf_id) || [];

// Step 2: prendi le notifiche
        const { data: notifs, error: err1 } = await supabase
            .from("ntf_notification")
            .select("id")
            .or(`assign_to_all.eq.true,id.in.(${ntfIds.join(",")})`);


        if (err1) throw err1;

        if (!notifs || notifs.length === 0) {
            return NextResponse.json({ ok: true });
        }

        const rows = notifs.map(n => ({
            psn_id: psnId,
            ntf_id: n.id,
            is_read: true,
            viewed_at: new Date().toISOString()
        }));

        const { error: err2 } = await supabase
            .from("ntf_view")
            .upsert(rows, { onConflict: ["psn_id", "ntf_id"] as any });

        if (err2) throw err2;

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("PATCH /api/notifications/mark-all error", err);
        return NextResponse.json({ error: err?.message ?? "Internal error" }, { status: 500 });
    }
}
