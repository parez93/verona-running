'use server'

"use server";

import { createClient } from '@/utils/supabase/server'

export async function signUpAction(email: string, password: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (error) {
        return {
            success: false,
            message: error.message,
            code: error.code,
        };
    }

    return {
        success: true,
        needsConfirmation: !data.session,
        session: data.session,
        user: data.user,
    };
}
