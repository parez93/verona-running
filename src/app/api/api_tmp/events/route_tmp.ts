import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Event, EventInsert } from '@/types/models/event'

// 🧭 GET /api/events → lista eventi
export async function GET() {
    try {
        const supabase = await createSupabaseServerClient()
        const { data, error } = await supabase.from('evt_data').select('*')

        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        return NextResponse.json(data as Event[])
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// ➕ POST /api/events → crea un nuovo evento
export async function POST(request: Request) {
    try {
        const supabase = await createSupabaseServerClient()
        const newEvent: EventInsert = await request.json()

        const { data, error } = await supabase
            .from('evt_data')
            .insert(newEvent)
            .select()
            .single()

        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        return NextResponse.json(data as Event, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
