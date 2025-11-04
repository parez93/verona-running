"use server";

import {userById, updateUser} from "@/app/api/userApi";
import {UserUpdate} from "@/types/models/user";
import {supabase} from "@/lib/supabase/client";

export async function userByIdAct() {

    const result = await userById();
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

export async function vw_user_achievementsAct() {
    const currentUser = await userByIdAct();

    const result = await supabase
        .from('vw_user_achievements')
        .select('*')
        .eq('id_user', currentUser.id);

    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}


