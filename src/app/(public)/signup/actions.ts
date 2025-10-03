'use server'

"use server";

import { createClient } from '@/utils/supabase/server'
import {createAccount} from "@/api/account/accountService";
import {Account} from "better-auth";

export async function signUpAction(email: string, password: string, surname: string, name:string) {
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

    if (!data.user) {
        throw new Error("User not logged in");
    }

    const account = await createAccount(supabase, data.user.id, surname, name);

    return {
        success: true,
        needsConfirmation: !data.session,
        session: data.session,
        user: data.user,
    };
}
