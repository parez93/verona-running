import type {NextApiRequest, NextApiResponse} from 'next'
import {Event} from '@/types/models/event'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<Event[] | { error: string }>) {
    try {
        const now = new Date().toISOString()
        const { data, error } = await supabase.from('evt_data').select('*').lt('datetime', now)
        if (error) throw error
        res.status(200).json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
