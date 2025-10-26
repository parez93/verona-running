import type {NextApiRequest, NextApiResponse} from 'next'
import {User, UserUpdate} from '@/types/models/user'
import {createSupabaseServerClient} from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | { error: string }>) {
    const { id } = req.query

    try {
        if (req.method === 'GET') {
            const { data, error } = await supabase.from('psn_data').select('*').eq('id', id).single()
            if (error) throw error
            return res.status(200).json(data)
        }

        if (req.method === 'PUT') {
            const updatedUser: UserUpdate = req.body
            const { data, error } = await supabase.from('psn_data').update(updatedUser).eq('id', id).select()
            if (error) throw error
            return res.status(200).json(data[0])
        }

        if (req.method === 'DELETE') {
            const { error } = await supabase.from('psn_data').delete().eq('id', id)
            if (error) throw error
            return res.status(204).end()
        }

        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
