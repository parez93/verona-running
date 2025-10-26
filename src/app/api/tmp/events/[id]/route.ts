import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Event, EventUpdate } from '@/types/models/event'

// 🧭 GET /api/events/[id] → singolo evento
export async function GET(
    _request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const supabase = await createSupabaseServerClient()

        const { data, error } = await supabase
            .from('evt_data')
            .select('*')
            .eq('id', id)
            .single()

        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        return NextResponse.json(data as Event)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// ✏️ PUT /api/events/[id] → aggiorna evento
export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const supabase = await createSupabaseServerClient()
        const updatedEvent: EventUpdate = await request.json()

        const { data, error } = await supabase
            .from('evt_data')
            .update(updatedEvent)
            .eq('id', id)
            .select()
            .single()

        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        return NextResponse.json(data as Event)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// ❌ DELETE /api/events/[id] → elimina evento
export async function DELETE(
    _request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const supabase = await createSupabaseServerClient()

        const { error } = await supabase.from('evt_data').delete().eq('id', id)

        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        return new NextResponse(null, { status: 204 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
