import type { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { BugReport } from '@/types/models/bugreport'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BugReport[] | { error: string }>
) {
    const { priority } = req.query
    const supabase = await createSupabaseServerClient()

    try {
        const { data, error } = await supabase
            .from('sys_bugreport')
            .select('*')
            .eq('priority', priority)

        if (error) throw error

        res.status(200).json(data)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
