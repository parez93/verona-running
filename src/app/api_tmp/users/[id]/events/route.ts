import type { NextApiRequest, NextApiResponse } from 'next'
import { Event } from '@/types/models/event'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Event[] | { error: string }>
) {
    const { id } = req.query
    const supabase = await createSupabaseServerClient()

    try {
        // 1️⃣ Ottieni tutti gli id_event a cui l'utente è registrato
        const { data: registrations, error: regError } = await supabase
            .from('evt_registration')
            .select('id_event')
            .eq('id_user', id)

        if (regError) throw regError

        const eventIds = registrations?.map(r => r.id_event) ?? []

        // 2️⃣ Se non ci sono registrazioni, ritorna array vuoto
        if (eventIds.length === 0) return res.status(200).json([])

        // 3️⃣ Ottieni eventi corrispondenti
        const { data: events, error: eventsError } = await supabase
            .from('evt_data')
            .select('*')
            .in('id', eventIds)

        if (eventsError) throw eventsError

        res.status(200).json(events)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
