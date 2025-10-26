import {createSupabaseServerClient} from '@/lib/supabase/server'
import {User, UserInsert, UserUpdate} from "@/types/models/user";

export async function userList() {
    const supabase = await createSupabaseServerClient()


    const {data, error} = await supabase.from('psn_data').select('*')
    if (error) {
        return {error: error.message}
    }

    return data as User[]
}

export async function makeUser(newUser: UserInsert) {
    const supabase = await createSupabaseServerClient()

    const {data, error} = await supabase
        .from('psn_data')
        .insert(newUser)
        .select()
        .maybeSingle()


    if (error) {
        return {error: error.message}
    }

    return data as User
}

export async function userById() {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    const {data, error} = await supabase
        .from('psn_data')
        .select('*')
        .eq('id', user?.id)

    if (error) {
        return {error: error.message}
    }

    return data[0] as User
}

export async function updateUser(
    updatedUser: UserUpdate
) {
    const supabase = await createSupabaseServerClient()

    const {data, error} = await supabase
        .from('psn_data')
        .update(updatedUser)
        .eq('id', updatedUser.id)
        .select('*')
        .maybeSingle()

    if (error) {
        return {error: error.message}
    }

    const _ignored = await supabase.auth.updateUser(
        {
            data: {

                name: updatedUser.name,
                surname: updatedUser.surname,
                img_base64: null,
            }
        }
    )

    return data as User
}

export async function deleteUser(
    id_user: string,
) {
    const supabase = await createSupabaseServerClient()
    const {error} = await supabase
        .from('psn_data')
        .delete()
        .eq('id', id_user)

    if (error) {
        return {error: error.message}
    }

    return { success: true }
}
