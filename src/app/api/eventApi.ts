import {NextResponse} from 'next/server'
import {createSupabaseServerClient, getSupabaseUser} from '@/lib/supabase/server'
import {Event, EventInsert, EventUpdate, EventWithRegistration} from '@/types/models/event'

export async function eventList() {
    try {
        const supabase = await createSupabaseServerClient()
        const {data, error} = await supabase.from('evt_data').select('*')

        if (error) return {error: error.message}
        return data as Event[]
    } catch (error: any) {
        return {error: error.message}
    }
}

// ➕ POST /api/events → crea un nuovo evento
export async function makeEvent(newEvent: EventInsert) {
    try {
        const supabase = await createSupabaseServerClient()

        const {data, error} = await supabase
            .from('evt_data')
            .insert(newEvent)
            .select()
            .single()

        if (error) {
            error: error.message
        }
        return data as Event
    } catch (error: any) {
        return {error: error.message}
    }
}

// ✏️ PUT /api/events/[id] → aggiorna evento
export async function updateEvent(updatedEvent: EventUpdate) {
    try {
        const supabase = await createSupabaseServerClient()

        const {data, error} = await supabase
            .from('evt_data')
            .update(updatedEvent)
            .eq('id', updatedEvent.id)
            .select()
            .single()

        if (error) return {error: error.message}
        return data as Event
    } catch (error: any) {
        return {error: error.message}
    }
}

// ❌ DELETE /api/events/[id] → elimina evento
export async function deleteEvent(idEvent: number) {
    try {
        const supabase = await createSupabaseServerClient()

        const {error} = await supabase.from('evt_data').delete().eq('id', idEvent)

        if (error) return {error: error.message}
        return { success: true }
    } catch (error: any) {
        return {error: error.message}
    }
}


export async function eventsWithRegistration(
    fromDate?: string
): Promise<EventWithRegistration[] | { error: string }> {
    try {
        const supabase = await createSupabaseServerClient();
        const {data: {user}} = await supabase.auth.getUser();

        // 1️⃣ Base query: tutti gli eventi
        let query = supabase.from("evt_data").select("*");

        // 2️⃣ Se è presente fromDate, filtro per data
        if (fromDate) {
            query = query.gte("datetime", fromDate);
        }

        const {data: events, error: eventError} = await query;

        if (eventError) throw eventError;

        // 3️⃣ Recupero registrazioni per l’utente
        const {data: registrations, error: regError} = await supabase
            .from("evt_registration")
            .select("id_event")
            .eq("id_user", user?.id);

        if (regError) throw regError;

        // 4️⃣ Aggiungo flag `is_registered`
        const registeredEventIds = new Set(registrations.map((r) => r.id_event));
        const eventsWithFlag: EventWithRegistration[] = events.map((e) => ({
            ...e,
            is_registered: registeredEventIds.has(e.id),
        }));

        return eventsWithFlag;
    } catch (error: any) {
        console.error("❌ Error in eventWithRegistration:", error);
        return {error: error.message};
    }
}

export async function eventWithRegistration(
    id_event: number
): Promise<EventWithRegistration | { error: string }> {
    try {
        const supabase = await createSupabaseServerClient();

        // 1️⃣ Base query: tutti gli eventi
        let query = supabase.from("evt_data").select("*").eq("id", id_event);
        ;

        const {data: events, error: eventError} = await query;

        if (eventError) throw eventError;

        // 3️⃣ Recupero registrazioni per l’utente
        const {data: registrations, error: regError} = await supabase
            .from("evt_registration")
            .select("id_event")
            .eq("id_event", id_event);

        if (regError) throw regError;

        // 4️⃣ Aggiungo flag `is_registered`
        const registeredEventIds = new Set(registrations.map((r) => r.id_event));
        const eventsWithFlag: EventWithRegistration[] = events.map((e) => ({
            ...e,
            is_registered: registeredEventIds.has(e.id),
        }));

        return eventsWithFlag[0];
    } catch (error: any) {
        console.error("❌ Error in eventWithRegistration:", error);
        return {error: error.message};
    }
}
