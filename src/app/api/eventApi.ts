import {NextResponse} from 'next/server'
import {createSupabaseServerClient, getSupabaseUser} from '@/lib/supabase/server'
import {Event, EventInsert, EventUpdate, EventWithRegistration} from '@/types/models/event'
import {Registration} from "@/types/models/registration";
import {User} from "@/types/models/user";

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


export async function eventListWithRegistrations() {
    try {
        const supabase = await createSupabaseServerClient()

        // Select annidata: prende gli eventi, per ogni evento prende evt_registration e per ogni registrazione prende psn_data
        // PostgREST / Supabase permette select annidate quando le FK/relazioni sono presenti nel DB.
        const { data, error } = await supabase
            .from('evt_data')
            .select(`*, evt_registration(id, id_event, id_user, created_at, updated_at, psn_data(name, surname, email, id, date_of_birth, img_base64, is_admin))`)

        if (error) return { error: error.message }

        // Aggiungo registrations_count per ciascun evento
        const eventsWithCounts = (data as any[]).map(ev => {
            const regs = ev.evt_registration ?? []
            return {
                ...ev,
                registrations: regs,
                registrations_count: Array.isArray(regs) ? regs.length : 0,
            }
        })

        return eventsWithCounts as (Event & {
            registrations?: (Registration & { psn_data?: User })[]
            registrations_count?: number
        })[]
    } catch (error: any) {
        return {error: error.message}
    }
}
