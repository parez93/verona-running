"use server";

import { createClient } from '@/utils/supabase/server'
import {fetchAccount, updateAccount} from "@/api/account/accountService";
import {AccountUpdate} from "@/api/account/account";
import {createEventRegistration, deleteEventRegistration, fetchEvents} from "@/api/event/eventService";
import {getUserFromCookie, UserFromCookie} from "@/utils/supabase/getUserFromCookie";


export async function fetchUserCookieAction(): Promise<UserFromCookie | null> {

    const account = await getUserFromCookie()


    return account;
}
