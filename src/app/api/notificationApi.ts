import {NotificationCreateInput, NotificationUpdateInput} from "@/lib/validation/notification";
import {createSupabaseServerClient} from "@/lib/supabase/server";


/**
 * Convert DB snake_case -> camelCase optionally when needed.
 * Here we mostly return raw rows and the UI maps fields as needed.
 */

/** Get notifications for a given psn_id (user).
 *  Strategy:
 *   - Notifications explicitly assigned to user (via psn_ntf)
 *   - Notifications with assign_to_all = true
 *   - Left join to ntf_view to obtain is_read/viewed_at for that user
 *  Returns sorted by created_at desc
 */
export async function getNotificationsForUser(psn_id: string, limit = 100) {
    const supabase = await createSupabaseServerClient();
    const {data: {user}} = await supabase.auth.getUser();
    if (user == null) return {error: "Missing user id"};

    psn_id = user.id;
    // we perform two-part query using RPC style via supabase-js
    // Query notifications + left join ntf_view filtered by psn_id.
    /*    const { data, error } = await supabase
            .from("ntf_notification")
            .select(`
          id,
          type,
          title,
          message,
          icon,
          action_url,
          assign_to_all,
          created_at,
          updated_at,
          meta,
          ntf_view!left(is_read, viewed_at, psn_id)
        `)
            .or(`assign_to_all.eq.true, id.in.(select ntf_id from psn_ntf where psn_id.eq.${psn_id})`)
            .order("created_at", { ascending: false })
            .limit(limit);*/


    const {data: userNtfIds, error: userNtfError} = await supabase
        .from("psn_ntf")
        .select("ntf_id")
        .eq("psn_id", psn_id);

    if (userNtfError) throw userNtfError;

    const ntfIds = userNtfIds?.map((r) => r.ntf_id) ?? [];
    const {data, error} = await supabase
        .from("ntf_notification")
        .select(`
    id,
    type,
    title,
    message,
    icon,
    action_url,
    assign_to_all,
    created_at,
    updated_at,
    meta,
    ntf_view!left(is_read, viewed_at, psn_id)
  `)
        .or(`assign_to_all.eq.true,id.in.(${ntfIds.join(",")})`)
        .order("created_at", {ascending: false})
        .limit(limit);


    if (error) throw error;

    // Map to a shape easier for frontend
    const mapped = (data as any[]).map((row) => {
        const view = Array.isArray(row.ntf_view) && row.ntf_view.length ? row.ntf_view[0] : null;
        return {
            id: row.id,
            type: row.type,
            title: row.title,
            message: row.message,
            icon: row.icon,
            actionUrl: row.action_url,
            assignToAll: row.assign_to_all,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            meta: row.meta,
            isRead: view?.is_read ?? false,
            viewedAt: view?.viewed_at ?? null
        };
    });


    return mapped;
}

/** Upsert ntf_view marking read/viewed for a user */
export async function markNotificationRead(psn_id: string, ntf_id: number) {
    const supabase = await createSupabaseServerClient();

    const {data, error} = await supabase
        .from("ntf_view")
        .upsert({
            psn_id,
            ntf_id,
            is_read: true,
            viewed_at: new Date().toISOString()
        }, {onConflict: ["psn_id", "ntf_id"]  as any});

    if (error) throw error;
    return data;
}

/** Admin: create notification + optionally assign to users */
export async function adminCreateNotification(payload: NotificationCreateInput) {
    const insertPayload: any = {
        type: payload.type,
        title: payload.title,
        message: payload.message,
        icon: payload.icon ?? null,
        action_url: payload.actionUrl ?? null,
        assign_to_all: !!payload.assignToAll,
        meta: payload.meta ?? {}
    };
    const supabase = await createSupabaseServerClient();


    const {data, error} = await supabase
        .from("ntf_notification")
        .insert([insertPayload])
        .select()
        .single();

    if (error) throw error;

    // handle explicit assigned users if provided and not assignToAll
    if (!payload.assignToAll && payload.assignedUsers && payload.assignedUsers.length) {
        const rows = payload.assignedUsers.map(psn_id => ({psn_id, ntf_id: data.id}));
        const {error: e2} = await supabase.from("psn_ntf").insert(rows);
        if (e2) throw e2;
    }

    return data;
}

/** Admin: update notification and reassign psn_ntf if assignedUsers provided */
export async function adminUpdateNotification(id: number, payload: NotificationUpdateInput) {
    const updatePayload: any = {
        ...(payload.type !== undefined ? {type: payload.type} : {}),
        ...(payload.title !== undefined ? {title: payload.title} : {}),
        ...(payload.message !== undefined ? {message: payload.message} : {}),
        ...(payload.icon !== undefined ? {icon: payload.icon} : {}),
        ...(payload.actionUrl !== undefined ? {action_url: payload.actionUrl} : {}),
        ...(payload.assignToAll !== undefined ? {assign_to_all: payload.assignToAll} : {}),
        ...(payload.meta !== undefined ? {meta: payload.meta} : {})
    };

    const supabase = await createSupabaseServerClient();

    const {data, error} = await supabase
        .from("ntf_notification")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    // if assignedUsers provided, replace psn_ntf assignments (simple strategy)
    if (Array.isArray(payload.assignedUsers)) {
        // remove old explicit assignments
        await supabase.from("psn_ntf").delete().eq("ntf_id", id);
        // insert new ones if assignToAll is false
        if (!payload.assignToAll && payload.assignedUsers.length) {
            const rows = payload.assignedUsers.map(psn_id => ({psn_id, ntf_id: id}));
            const {error: e2} = await supabase.from("psn_ntf").insert(rows);
            if (e2) throw e2;
        }
    }

    return data;
}

/** Admin: delete */
export async function adminDeleteNotification(id: number) {
    const supabase = await createSupabaseServerClient();

    const {error} = await supabase.from("ntf_notification").delete().eq("id", id);
    if (error) throw error;
    return true;
}

/** Admin list with pagination and optional filters */
export async function adminListNotifications({page = 1, perPage = 20, q, type}: {
    page?: number,
    perPage?: number,
    q?: string,
    type?: string
}) {
    const supabase = await createSupabaseServerClient();

    const offset = (page - 1) * perPage;
    let builder: any = supabase
        .from("ntf_notification")
        .select("*, (select count(*) from psn_ntf where psn_ntf.ntf_id = ntf_notification.id) as assigned_count", {count: "exact"})
        .order("created_at", {ascending: false})
        .range(offset, offset + perPage - 1);

    if (q) builder = builder.ilike("title", `%${q}%`);
    if (type) builder = builder.eq("type", type);

    const {data, error, count} = await builder;
    if (error) throw error;

    return {data, count: count ?? null, page, perPage};
}
