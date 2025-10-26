// app/api/evt_registration/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'

type EvtRegistration = Tables<'evt_registration'>

export async function GET(req: NextRequest) {
    const supabase = await createSupabaseServerClient()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
        const { data, error } = await supabase.from('evt_registration').select('*').eq('id', Number(id)).single()
        if (error) return NextResponse.json({ error: error.message }, { status: 400 })
        return NextResponse.json(data)
    }

    const { data, error } = await supabase.from('evt_registration').select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    const supabase = await createSupabaseServerClient()
    const body: Partial<EvtRegistration> & { id_event: number } = await req.json()
    const { data, error } = await supabase.from('evt_registration').insert([body])
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
    const supabase = await createSupabaseServerClient()
    const body: Partial<EvtRegistration> & { id: number } = await req.json()
    if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { id, ...updateData } = body
    const { data, error } = await supabase.from('evt_registration').update(updateData).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
    const supabase = await createSupabaseServerClient()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { data, error } = await supabase.from('evt_registration').delete().eq('id', Number(id))
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
}
