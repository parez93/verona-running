import { NextResponse } from 'next/server'
import { createSupabaseServerClient, getSupabaseUser } from '@/lib/supabase/server'
import { RegistrationInsert } from '@/types/models/registration'


// ✅ GET /api/registrations
export async function GET() {
    try {
        const supabase = await createSupabaseServerClient()
        const { data, error } = await supabase.from('evt_registration').select('*')

        if (error) throw error
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// ✅ POST /api/registrations
export async function POST(request: Request) {
    try {
        const user = await getSupabaseUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const newReg: RegistrationInsert = await request.json()
        const supabase = await createSupabaseServerClient()

        const { data, error } = await supabase
            .from('evt_registration')
            .insert({
                ...newReg,
                id_user: user.id, // forziamo user id da sessione
            })
            .select()

        if (error) throw error

        return NextResponse.json(data[0])
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// ✅ DELETE /api/registrations?id_event=yyy
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const event_id = searchParams.get('id_event')

        if (!event_id) {
            return NextResponse.json({ error: 'Missing user_id or event_id' }, { status: 400 })
        }

        const user = await getSupabaseUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const supabase = await createSupabaseServerClient()
        const { error } = await supabase
            .from('evt_registration')
            .delete()
            .eq('id_user', user.id)
            .eq('id_event', event_id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
