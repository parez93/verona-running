import type {NextApiRequest, NextApiResponse} from 'next'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { count: totalUsers } = await supabase.from('psn_data').select('*', { count: 'exact' })
        res.status(200).json({ totalUsers })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
