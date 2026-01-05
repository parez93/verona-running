// /app/api/notifications/[id]/route.ts
import {NextRequest, NextResponse} from "next/server";
import { markNotificationRead } from  "@/app/api/notificationApi";
import {createSupabaseServerClient} from "@/lib/supabase/server";


export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const body = await request.json();

        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        const psnId = user?.id;
        if (!psnId) {
            return NextResponse.json({ error: "psnId required" }, { status: 400 });
        }

        const ntfId = Number(id);
        if (Number.isNaN(ntfId)) {
            return NextResponse.json({ error: "invalid id" }, { status: 400 });
        }

        await markNotificationRead(psnId, ntfId);

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("PATCH /api/notifications/[id] error", err);
        return NextResponse.json({ error: err?.message ?? "Internal error" }, { status: 500 });
    }
}
