import { NextResponse } from 'next/server'
import { createSupabaseServerClient, getSupabaseUser } from '@/lib/supabase/server'

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getSupabaseUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const supabase = await createSupabaseServerClient()

        const { error } = await supabase
            .from('evt_registration')
            .delete()
            .eq('id', params.id)
            .eq('id_user', user.id) // sicurezza: può cancellare solo la propria
        if (error) throw error

        // ✅ 204 No Content = successo senza body
        return new NextResponse(null, { status: 204 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
