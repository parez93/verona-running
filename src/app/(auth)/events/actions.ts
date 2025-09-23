"use server";

import { createClient } from '@/utils/supabase/server'
import {fetchAccount, updateAccount} from "@/api/account/accountService";
import {AccountUpdate} from "@/api/account/account";
import {createEventRegistration, deleteEventRegistration, fetchEvents} from "@/api/event/eventService";


export async function fetchEventsAction() {

    const supabase = await createClient()

    const events = await fetchEvents(supabase);

    return events;
}

export async function fetchEventByIdAction(id:string) {

    const supabase = await createClient()

    const events = await fetchEvents(supabase, {search: id});

    return events;
}

export async function createEventRegistrationAction(idEvent: number, termsAndCondition: boolean) {

    const supabase = await createClient()

    const result = await createEventRegistration(supabase, {
        id_event: idEvent,
        terms_and_condition: termsAndCondition
    });

    return result;
}

export async function deleteEventRegistrationAction(idEvent: number) {

    const supabase = await createClient()

    const result = await deleteEventRegistration(supabase,  idEvent);

    return result;
}
