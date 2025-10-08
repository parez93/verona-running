"use server";

import { createClient } from '@/utils/supabase/server'
import {fetchAccount, fetchUsers, updateAccount} from "@/api/account/accountService";
import {AccountUpdate} from "@/api/account/account";


export async function fetchUsersAction() {

    const supabase = await createClient()

    const users = await fetchUsers(supabase);

    return users;
}

/*export async function updateAccountAction(input: AccountUpdate) {

    const supabase = await createClient()

    const account = await updateAccount(supabase, input);

    return account;
}*/


