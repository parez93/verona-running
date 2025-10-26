import type {NextApiRequest, NextApiResponse} from 'next'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { count: totalEvents } = await supabase.from('evt_data').select('*', { count: 'exact' })
        const { count: totalRegistrations } = await supabase.from('evt_registration').select('*', { count: 'exact' })
        res.status(200).json({ totalEvents, totalRegistrations })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
