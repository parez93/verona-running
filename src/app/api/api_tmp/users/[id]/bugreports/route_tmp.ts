import type {NextApiRequest, NextApiResponse} from 'next'
import {BugReport} from '@/types/models/bugreport'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<BugReport[] | { error: string }>) {
    const { id } = req.query

    try {
        const { data, error } = await supabase.from('sys_bugreport').select('*').eq('id_user', id)
        if (error) throw error
        res.status(200).json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
