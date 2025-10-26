import type {NextApiRequest, NextApiResponse} from 'next'
import {User, UserInsert} from '@/types/models/user'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | User | { error: string }>) {
    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase.from('psn_data').select('*')
            if (error) throw error
            return res.status(200).json(data)
        }

        if (req.method === 'POST') {
            const newUser: UserInsert = req.body
            const { data, error } = await supabase.from('psn_data').insert(newUser).select()
            if (error) throw error
            return res.status(201).json(data[0])
        }

        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
