// app/api/evt_data/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'

type EvtData = Tables<'evt_data'>

const evtDataSchema = z.object({
    title: z.string().optional(),
    info: z.string().optional(),
    datetime: z.string().optional(),
    img: z.string().optional(),
    location_label: z.string().optional(),
    location_url: z.string().optional(),
    route_url: z.string().optional(),
})

const evtDataUpdateSchema = evtDataSchema.extend({
    id: z.number(),
})

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    if (params.id) {
        const id = Number(params.id)
        const { data, error } = await supabase.from('evt_data').select('*').eq('id', id).single()
        if (error) return NextResponse.json({ error: error.message }, { status: 400 })
        return NextResponse.json({ data })
    }

    const { data, error } = await supabase.from('evt_data').select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
    const supabase = await createSupabaseServerClient()
    const body = await req.json()
    const parsed = evtDataSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

    const { data, error } = await supabase.from('evt_data').insert([parsed.data]).select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await req.json()
    const parsed = evtDataUpdateSchema.safeParse({ ...body, id })
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

    const { data, error } = await supabase.from('evt_data').update(parsed.data).eq('id', id).select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const { data, error } = await supabase.from('evt_data').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}
