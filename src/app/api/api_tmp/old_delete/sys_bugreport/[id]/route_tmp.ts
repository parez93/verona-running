// app/api/sys_bugreport/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'

type SysBugReport = Tables<'sys_bugreport'>

const bugSchema = z.object({
    category: z.string(),
    title: z.string(),
    description: z.string(),
    priority: z.string(),
    id_user: z.string().optional(),
    attachment: z.string().optional(),
    url: z.string().optional(),
})

const bugUpdateSchema = bugSchema.extend({ id: z.number() })

export async function GET(req: NextRequest, { params }: { params: { id?: string } }) {
    const supabase = await createSupabaseServerClient()
    if (params.id) {
        const { data, error } = await supabase.from('sys_bugreport').select('*').eq('id', Number(params.id)).single()
        if (error) return NextResponse.json({ error: error.message }, { status: 400 })
        return NextResponse.json({ data })
    }

    const { data, error } = await supabase.from('sys_bugreport').select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
    const supabase = await createSupabaseServerClient()
    const body = await req.json()
    const parsed = bugSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

    const { data, error } = await supabase.from('sys_bugreport').insert([parsed.data]).select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const id = Number(params.id)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const body = await req.json()
    const parsed = bugUpdateSchema.safeParse({ ...body, id })
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

    const { data, error } = await supabase.from('sys_bugreport').update(parsed.data).eq('id', id).select('*')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const id = Number(params.id)
    const { data, error } = await supabase.from('sys_bugreport').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ data })
}
