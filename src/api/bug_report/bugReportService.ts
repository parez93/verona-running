import type {SupabaseClient} from "@supabase/supabase-js"
import {EventRegistration} from "@/api/event/event";
import {getUserFromCookie} from "@/utils/supabase/getUserFromCookie";
import {BugReport} from "@/api/bug_report/bugreport";

export async function createBugReport(client: SupabaseClient, input: BugReport): Promise<EventRegistration> {
    console.log("Creating bug report...");

    const account = await getUserFromCookie()
    if (!account) {
        throw new Error("User not logged in");
    }
    const payload = {
        ...input,
        id_user: account.id,
    }

    const { data, error } = await client.from("sys_bugreport").insert(payload).select().single()
    if (error) throw new Error(error.message)
    return data;
}
