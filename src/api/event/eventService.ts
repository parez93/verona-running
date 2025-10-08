import type {SupabaseClient} from "@supabase/supabase-js"
import {EventInsert, EventRegistration, EventUpdate, EventWithRegistration, FetchEventsParams} from "@/api/event/event";
import {getUserFromCookie} from "@/utils/supabase/getUserFromCookie";

export async function fetchEvents(
    client: SupabaseClient,
    params: FetchEventsParams & { userId?: number } = {}
): Promise<{ items: EventWithRegistration[]; count: number }> {
    const {
        search = "",
        page = 1,
        pageSize = 10,
        order = { column: "datetime", ascending: false },
        userId,
    } = params
    console.log("Fetching events...");

    const account = await getUserFromCookie()


    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = client
        .from("evt_data")
        .select(
            `
            *,
            is_registered:evt_registration!left(id_event)
        `,
            { count: "exact" }
        )
        .order(order.column as string, { ascending: !!order.ascending })

    if (search.trim().length > 0) {
        query = query.or(`id.eq.${search}`)
    }

    query = query.gte("datetime", new Date().toISOString())

    query = query.eq("evt_registration.id_user", account?.id)

    const { data, error, count } = await query.range(from, to)
    if (error) throw new Error(error.message)

    return {
        items: (data || []).map((row: any) => ({
            ...row,
            is_registered: row.is_registered?.length > 0,
        })) as EventWithRegistration[],
        count: count ?? 0,
    };
}

export async function fetchAllEvents(
    client: SupabaseClient,
): Promise<{ items: Event[]; count: number }> {
    console.log("Fetching events...");

    const account = await getUserFromCookie()

    let query = client
        .from("evt_data")


    const { data, error, count } = await query.select()
    if (error) throw new Error(error.message)

    return {
        items: (data || []).map((row: any) => ({
            ...row,
            is_registered: row.is_registered?.length > 0,
        })) as EventWithRegistration[],
        count: count ?? 0,
    };
}

export async function createEventRegistration(client: SupabaseClient, input: EventRegistration): Promise<EventRegistration> {
    console.log("Creating event registration...");

    const account = await getUserFromCookie()
    if (!account) {
        throw new Error("User not logged in");
    }
    const payload = {
        ...input,
        id_user: account.id,
    }

    const { data, error } = await client.from("evt_registration").insert(payload).select().single()
    if (error) throw new Error(error.message)
    return data;
}

export async function deleteEventRegistration(client: SupabaseClient, idEvent: number): Promise<void> {
    console.log("Delete event registration...");

    const account = await getUserFromCookie()
    if (!account) {
        throw new Error("User not logged in");
    }

    const { error } = await client.from("evt_registration").delete().eq("id_event", idEvent).eq("id_user", account.id)
    if (error) throw new Error(error.message)
}


// Create a new event for the current authenticated user; injects user_id to satisfy RLS policies
export async function createEvent(client: SupabaseClient, input: EventInsert): Promise<Event> {
    const { data: userRes, error: userErr } = await client.auth.getUser()
    if (userErr) throw new Error(userErr.message)
    const user = userRes.user
    if (!user) throw new Error("Utente non autenticato")

    const payload = {
        ...input,
        user_id: user.id,
    }

    const { data, error } = await client.from("events").insert(payload).select().single()
    if (error) throw new Error(error.message)
    return data as Event
}

// Update an existing event; re-asserts user_id for RLS compliance
export async function updateEvent(client: SupabaseClient, id: string, input: EventUpdate): Promise<Event> {
    const { data: userRes, error: userErr } = await client.auth.getUser()
    if (userErr) throw new Error(userErr.message)
    const user = userRes.user
    if (!user) throw new Error("Utente non autenticato")

    const payload = {
        ...input,
        user_id: user.id,
    }

    const { data, error } = await client.from("events").update(payload).eq("id", id).select().single()
    if (error) throw new Error(error.message)
    return data as Event
}

// Delete an event by id; RLS ensures only owner can delete
export async function deleteEvent(client: SupabaseClient, id: string): Promise<void> {
    const { error } = await client.from("events").delete().eq("id", id)
    if (error) throw new Error(error.message)
}
