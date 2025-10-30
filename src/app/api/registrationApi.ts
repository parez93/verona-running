import { NextResponse } from 'next/server'
import { createSupabaseServerClient, getSupabaseUser } from '@/lib/supabase/server'
import {Registration, RegistrationInsert} from '@/types/models/registration'
import {EventWithRegistration} from "@/types/models/event";


// ✅ GET /api/registrations
export async function registrationList() {
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
export async function makeRegistration(newReg: RegistrationInsert): Promise<Registration | { error: string }> {
    try {
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('evt_registration')
            .insert({
                ...newReg,
            })
            .select()

        if (error) throw error

        return data[0]
    } catch (error: any) {
        return { error: error.message }
    }
}

// ✅ DELETE /api/registrations?id_event=yyy
export async function deleteRegistration(id_event: number): Promise<{ success: boolean} | {error: string }> {
    try {
        if (!id_event) {
            return { error: 'Missing id_event' }
        }

        const supabase = await createSupabaseServerClient();

        const { error } = await supabase
            .from('evt_registration')
            .delete()
            .eq('id_event', id_event)

        if (error) throw error

        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function deleteRegistrationById(registrationId: number) {
    try {
        const supabase = await createSupabaseServerClient()

        const { error } = await supabase
            .from('evt_registration')
            .delete()
            .eq('id', registrationId)

        if (error) return { error: error.message }
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}
