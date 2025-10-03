import type {SupabaseClient} from "@supabase/supabase-js";
import {Account, AccountUpdate} from "@/api/account/account";
import {getUserFromCookie} from "@/utils/supabase/getUserFromCookie";

export async function fetchAccount(
    client: SupabaseClient,
): Promise<Account> {

    console.log("Fetching account...");
    const account = await getUserFromCookie()

    const { data, error } = await client
        .from("psn_data")
        .select("*")
        .eq("id", account?.id)
        .maybeSingle(); // restituisce un singolo record

/*
    console.log("Fetched account data:", data, error);
*/

    if (error) throw new Error(error.message);

    return data as Account;
}

export async function createAccount(client: SupabaseClient, id: string, surname: string, name:string): Promise<Account> {
    console.log("Creating account...");


    const payload = {
        id: id,
        surname: surname,
        name: name,
    }

    const { data, error } = await client.from("psn_data").insert(payload).select().single()
    if (error) throw new Error(error.message)
    return data as Account
}

export async function updateAccount(client: SupabaseClient, input: AccountUpdate): Promise<Account> {
    console.log("Updating account...");

    const account = await getUserFromCookie()

    const payload = {
        ...input,
    }

    const { data, error } = await client.from("psn_data").update(payload).eq("id", account?.id).select().single()
    if (error) throw new Error(error.message)
    return data as Account
}
