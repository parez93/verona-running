import type {NextApiRequest, NextApiResponse} from 'next'
import {BugReport, BugReportUpdate} from '@/types/models/bugreport'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<BugReport | { error: string }>) {
    const { id } = req.query

    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase.from('sys_bugreport').select('*').eq('id', id).single()
            if (error) throw error
            return res.status(200).json(data)
        }

        if (req.method === 'PUT') {
            const updated: BugReportUpdate = req.body
            const { data, error } = await supabase.from('sys_bugreport').update(updated).eq('id', id).select()
            if (error) throw error
            return res.status(200).json(data[0])
        }

        if (req.method === 'DELETE') {
            const { error } = await supabase.from('sys_bugreport').delete().eq('id', id)
            if (error) throw error
            return res.status(204).end()
        }

        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
