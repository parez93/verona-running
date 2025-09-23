"use server";

import { createClient } from '@/utils/supabase/server'

export async function logout() {
    try {
        const supabase = await createClient()
        await supabase.auth.signOut();
        return true;
    } catch (err) {
        console.error("Logout failed:", err);
        return false;
    }
}
