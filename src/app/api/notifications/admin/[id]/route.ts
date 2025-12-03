// /app/api/admin/notifications/[id]/route.ts
import {NextRequest, NextResponse} from "next/server";
import { adminUpdateNotification, adminDeleteNotification } from  "@/app/api/notificationApi";
import { NotificationUpdateSchema } from "@/lib/validation/notification";
import {createSupabaseServerClient} from "@/lib/supabase/server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // 🔥 De-struttura i params in modo compatibile
        const { id } = await context.params;

        const supabase = await createSupabaseServerClient();

        const ntfId = Number(id);
        if (Number.isNaN(ntfId)) {
            return NextResponse.json({ error: "Invalid id" }, { status: 400 });
        }

        // 1️⃣ Notifica base
        const { data: notification, error: e1 } = await supabase
            .from("ntf_notification")
            .select("*")
            .eq("id", ntfId)
            .single();

        if (e1) throw e1;

        // 2️⃣ Utenti assegnati
        const { data: assignedUsers, error: e2 } = await supabase
            .from("psn_ntf")
            .select("psn_id, psn_data(*)")
            .eq("ntf_id", ntfId);

        if (e2) throw e2;

        // 3️⃣ Utenti che hanno visto
        const { data: viewedBy, error: e3 } = await supabase
            .from("ntf_view")
            .select("psn_id, is_read, viewed_at, psn_data(*)")
            .eq("ntf_id", ntfId);

        if (e3) throw e3;

        return NextResponse.json({
            notification,
            assignedUsers: assignedUsers.map(r => r.psn_data),
            viewedBy: viewedBy.map(v => ({
                ...v.psn_data,
                isRead: v.is_read,
                viewedAt: v.viewed_at
            }))
        });

    } catch (err: any) {
        console.error("GET /api/notifications/admin/[id] error", err);
        return NextResponse.json({ error: err?.message ?? "Internal error" }, { status: 500 });
    }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const body = await req.json();
        const parsed = NotificationUpdateSchema.parse(body);
        const data = await adminUpdateNotification(id, parsed);
        return NextResponse.json({ data });
    } catch (err: any) {
        console.error("PUT /api/admin/notifications/[id] error", err);
        return NextResponse.json({ error: err?.message ?? "Bad Request" }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        await adminDeleteNotification(id);
        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("DELETE /api/admin/notifications/[id] error", err);
        return NextResponse.json({ error: err?.message ?? "Internal error" }, { status: 500 });
    }
}
