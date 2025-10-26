import type {NextApiRequest, NextApiResponse} from 'next'
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {BugReport, BugReportInsert} from "@/types/models/bugreport";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<BugReport[] | BugReport | { error: string }>) {
    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase.from('sys_bugreport').select('*')
            if (error) throw error
            return res.status(200).json(data)
        }

        if (req.method === 'POST') {
            const newBug: BugReportInsert = req.body
            const { data, error } = await supabase.from('sys_bugreport').insert(newBug).select()
            if (error) throw error
            return res.status(201).json(data[0])
        }

        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
