// app/api/evt_registration/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'

type EvtRegistration = Tables<'evt_registration'>

const registrationSchema = z.object({
    id_event: z.number(),
    id_user: z.string().optional(),
})

const registrationUpdateSchema = registrationSchema.extend({
    id: z.number(),
})

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    if (!params.id) {
        const { data, error } = await supabase.from('evt_registration')
            .select(`*, evt_data(*), psn_data(*)`)
        if (error) return NextResponse.json({ error: error.message }, { status: 400 })
        return NextResponse.json({ data })
    }

    const id = Number(params.id)
    const { data, error } = await supabase.from('evt_registration')
        .select(`*, evt_data(*), psn_data(*)`)
        .eq('id', id)
        .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
    const supabase = await createSupabaseServerClient()
    const body = await req.json()
    const parsed = registrationSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

    const { data, error } = await supabase.from('evt_registration').insert([parsed.data]).select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await req.json()
    const parsed = registrationUpdateSchema.safeParse({ ...body, id })
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

    const { data, error } = await supabase.from('evt_registration')
        .update(parsed.data).eq('id', id).select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const { data, error } = await supabase.from('evt_registration').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}
