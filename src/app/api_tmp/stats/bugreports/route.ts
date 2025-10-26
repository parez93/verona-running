import type {NextApiRequest, NextApiResponse} from 'next'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { count: totalBugs } = await supabase.from('sys_bugreport').select('*', { count: 'exact' })
        res.status(200).json({ totalEvents: totalBugs })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
