"use server";

import { redirect } from "next/navigation";
import { createClient } from '@/utils/supabase/server'
import {ROUTES} from "@/constants/routes";


export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        // Rilancia errore che puoi gestire lato client
        throw new Error(error.message);
    }

    // Login riuscito → redirect a /events
    redirect(ROUTES.events());
}


