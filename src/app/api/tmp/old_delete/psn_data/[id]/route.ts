// app/api/psn_data/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'

type PsnData = Tables<'psn_data'>

const psnSchema = z.object({
    name: z.string().optional(),
    surname: z.string().optional(),
    date_of_birth: z.string().optional(),
    img_base64: z.string().optional(),
})

const psnUpdateSchema = psnSchema.extend({ id: z.string() })

export async function GET(req: NextRequest, { params }: { params: { id?: string } }) {
    const supabase = await createSupabaseServerClient()
    if (params.id) {
        const { data, error } = await supabase.from('psn_data').select('*').eq('id', params.id).single()
        if (error) return NextResponse.json({ error: error.message }, { status: 400 })
        return NextResponse.json({ data })
    }
    const { data, error } = await supabase.from('psn_data').select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
    const supabase = await createSupabaseServerClient()
    const body = await req.json()
    const parsed = psnSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

    const { data, error } = await supabase.from('psn_data').insert([parsed.data]).select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const body = await req.json()
    const parsed = psnUpdateSchema.safeParse({ ...body, id: params.id })
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

    const { id, ...updateData } = parsed.data
    const { data, error } = await supabase.from('psn_data').update(updateData).eq('id', id).select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.from('psn_data').delete().eq('id', params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}
