"use server";

import {userById, updateUser} from "@/app/api/userApi";
import {UserUpdate} from "@/types/models/user";

export async function userByIdAct() {

    const result = await userById();
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

