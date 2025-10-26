import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Event } from '@/types/models/event'

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient()
        const now = new Date().toISOString()

        const { data, error } = await supabase
            .from('evt_data')
            .select('*')
            .gte('datetime', now)

        if (error) return NextResponse.json({ error: error.message }, { status: 500 })

        return NextResponse.json(data as Event[])
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
