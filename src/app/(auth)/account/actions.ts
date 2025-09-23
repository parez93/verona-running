"use server";

import { createClient } from '@/utils/supabase/server'
import {fetchAccount, updateAccount} from "@/api/account/accountService";
import {AccountUpdate} from "@/api/account/account";


export async function fetchAccountAction() {

    const supabase = await createClient()

    const account = await fetchAccount(supabase);

    return account;
}

export async function updateAccountAction(input: AccountUpdate) {

    const supabase = await createClient()

    const account = await updateAccount(supabase, input);

    return account;
}


