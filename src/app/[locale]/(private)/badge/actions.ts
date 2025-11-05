"use server";

import {userById} from "@/app/api/userApi";

export async function userByIdAct() {

    const result = await userById();
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}


