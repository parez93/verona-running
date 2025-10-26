"use server";

import {deleteUser, updateUser, userList} from "@/app/api/userApi";
import {UserUpdate} from "@/types/models/user";


export async function userListAct() {

    const result = await userList();
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

export async function deleteUserAct(id_user: string) {

    const result = await deleteUser(id_user);
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}


