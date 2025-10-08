"use server";

import { createClient } from '@/utils/supabase/server'
import {fetchAccount, updateAccount} from "@/api/account/accountService";
import {AccountUpdate} from "@/api/account/account";
import {createEventRegistration, deleteEventRegistration, fetchAllEvents, fetchEvents} from "@/api/event/eventService";


export async function fetchAdminEventsAction() {

    const supabase = await createClient()

    const events = await fetchAllEvents(supabase);

    return events.items;
}

/*export async function fetchEventByIdAction(id:string) {

    const supabase = await createClient()

    const events = await fetchEvents(supabase, {search: id});

    return events;
}

export async function createEventRegistrationAction(idEvent: number) {

    const supabase = await createClient()

    const result = await createEventRegistration(supabase, {
        id_event: idEvent
    });

    return result;
}

export async function deleteEventRegistrationAction(idEvent: number) {

    const supabase = await createClient()

    const result = await deleteEventRegistration(supabase,  idEvent);

    return result;
}*/
