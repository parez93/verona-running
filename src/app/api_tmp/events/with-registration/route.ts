import {NextResponse} from 'next/server'
import {createSupabaseServerClient, getSupabaseUser} from '@/lib/supabase/server'
import {EventWithRegistration} from '@/types/models/event'

export async function GET(
    request: Request
) {
    try {
        const supabase = await createSupabaseServerClient()

        const user2 = await getSupabaseUser()
        // 1️⃣ Prendo tutti gli eventi
        const {data: events, error: eventError} = await supabase
            .from('evt_data')
            .select('*')



        if (eventError) throw eventError

        // 2️⃣ Prendo tutte le registrazioni per l’utente
        const {data: registrations, error: regError} = await supabase
            .from('evt_registration')
            .select('id_event')
            .eq('id_user', user2?.id)

        if (regError) throw regError

        // 3️⃣ Aggiungo flag is_registered
        const registeredEventIds = new Set(registrations.map(r => r.id_event))
        const eventsWithFlag: EventWithRegistration[] = events.map(e => ({
            ...e,
            is_registered: registeredEventIds.has(e.id),
        }))
        return NextResponse.json(eventsWithFlag)
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
