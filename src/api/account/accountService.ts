import type {SupabaseClient} from "@supabase/supabase-js";
import {Account, AccountUpdate} from "@/api/account/account";

export async function fetchAccount(
    client: SupabaseClient,
): Promise<Account> {
    const {
        data: { user },
    } = await client.auth.getUser()

    const { data, error } = await client
        .from("psn_data")
        .select("*")
        .eq("uuid", user?.id)
        .maybeSingle(); // restituisce un singolo record

    console.log("Fetched account data:", data, error);

    if (error) throw new Error(error.message);

    return data as Account;
}


export async function updateAccount(client: SupabaseClient, input: AccountUpdate): Promise<Account> {
    const {
        data: { user },
    } = await client.auth.getUser()

    const payload = {
        ...input,
    }

    const { data, error } = await client.from("psn_data").update(payload).eq("uuid", user?.id).select().single()
    if (error) throw new Error(error.message)
    return data as Account
}
