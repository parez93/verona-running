// /app/api/notifications/admin/route.ts
import {NextRequest, NextResponse} from "next/server";
import { adminCreateNotification, adminListNotifications } from  "@/app/api/notificationApi";
import { NotificationCreateSchema } from "@/lib/validation/notification";
import {createSupabaseServerClient} from "@/lib/supabase/server";



export async function GET(request: NextRequest) {
    try {
        const supabase = await createSupabaseServerClient();
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const perPage = parseInt(url.searchParams.get("perPage") || "20", 10);
        const q = url.searchParams.get("q") || undefined;
        const type = url.searchParams.get("type") || undefined;
        const assignedTo = url.searchParams.get("assignedTo") || undefined;
        const readFilter = url.searchParams.get("read") || undefined;

        const offset = (page - 1) * perPage;

        // ---------------------------------------------------------
        // 1️⃣ QUERY: totalCount (nessun filtro, nessuna paginazione)
        // ---------------------------------------------------------
        const { count: totalCount, error: totalErr } = await supabase
            .from("ntf_notification")
            .select("*", { count: "exact", head: true });

        if (totalErr) throw totalErr;

        // ---------------------------------------------------------
        // 2️⃣ QUERY: filteredCount (con filtri, senza paginazione)
        // ---------------------------------------------------------
        let filteredBuilder = supabase
            .from("ntf_notification")
            .select("id", { count: "exact", head: true });

        if (q) filteredBuilder = filteredBuilder.ilike("title", `%${q}%`);
        if (type) filteredBuilder = filteredBuilder.eq("type", type);

        if (assignedTo) {
            filteredBuilder = filteredBuilder.contains("psn_ntf.psn_id", [assignedTo]);
        }

        if (readFilter === "read") {
            filteredBuilder = filteredBuilder.filter("ntf_view.is_read", "eq", true);
        }
        if (readFilter === "unread") {
            filteredBuilder = filteredBuilder.filter("ntf_view.is_read", "eq", false);
        }

        const { count: filteredCount, error: filteredErr } = await filteredBuilder;
        if (filteredErr) throw filteredErr;

        // ---------------------------------------------------------
        // 3️⃣ QUERY: DATA PAGINATA (i tuoi dati attuali)
        // ---------------------------------------------------------
        let builder = supabase
            .from("ntf_notification")
            .select(`
                *,
                psn_ntf(psn_id, psn_data(*)),
                ntf_view(psn_id, viewed_at, is_read, psn_data(*))
            `, { count: "exact" })
            .order("created_at", { ascending: false })
            .range(offset, offset + perPage - 1);

        if (q) builder = builder.ilike("title", `%${q}%`);
        if (type) builder = builder.eq("type", type);

        if (assignedTo) {
            builder = builder.contains("psn_ntf.psn_id", [assignedTo]);
        }

        if (readFilter === "read") {
            builder = builder.filter("ntf_view.is_read", "eq", true);
        }

        if (readFilter === "unread") {
            builder = builder.filter("ntf_view.is_read", "eq", false);
        }

        const { data, error } = await builder;
        if (error) throw error;

        const mapped = (data || []).map(n => {
            const assignedUsers =
                n.psn_ntf?.map((r: { psn_data: any }) => r.psn_data) || [];

            const viewedBy =
                n.ntf_view?.map((v: { psn_data: any; viewed_at: any; is_read: any }) => ({
                    ...v.psn_data,
                    viewedAt: v.viewed_at,
                    isRead: v.is_read,
                })) || [];

            return {
                ...n,
                assignedUsers,
                viewedBy,
            };
        });

        return NextResponse.json({
            data: mapped,
            page,
            perPage,
            filteredCount,
            totalCount,
        });

    } catch (err: any) {
        console.error("GET /api/notifications/admin error", err);
        return NextResponse.json({ error: err?.message ?? "Internal error" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = NotificationCreateSchema.parse(body);

        const data = await adminCreateNotification(parsed);

        return NextResponse.json({ data });
    } catch (err: any) {
        console.error("POST /api/notifications/admin error", err);
        return NextResponse.json(
            { error: err?.message ?? err?.toString() ?? "Bad Request" },
            { status: 400 }
        );
    }
}
