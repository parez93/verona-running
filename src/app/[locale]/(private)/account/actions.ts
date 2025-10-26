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

export async function updateUserAct(input: UserUpdate) {
    const result = await updateUser(input);
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}


