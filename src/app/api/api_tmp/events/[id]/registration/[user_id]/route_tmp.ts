import type {NextApiRequest, NextApiResponse} from 'next'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ registered: boolean } | { error: string }>) {
    const { id, user_id } = req.query

    try {
        const { data, error } = await supabase
            .from('evt_registration')
            .select('*')
            .eq('id_event', id)
            .eq('id_user', user_id)
            .single()

        if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found
        res.status(200).json({ registered: !!data })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
