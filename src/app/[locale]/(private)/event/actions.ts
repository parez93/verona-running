'use server';

import {eventsWithRegistration, eventWithRegistration} from "@/app/api/eventApi";
import {EventWithRegistration} from "@/types/models/event";
import {makeRegistration, deleteRegistration} from "@/app/api/registrationApi";
import {Registration} from "@/types/models/registration";


export async function eventsWithRegistrationAct(): Promise<EventWithRegistration[]> {
    const result = await eventsWithRegistration(new Date().toISOString());
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

export async function eventWithRegistrationAct(id_event: number): Promise<EventWithRegistration> {
    const result = await eventWithRegistration(id_event);
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

export async function makeRegistrationAct(id_event: number): Promise<Registration> {
    const result = await makeRegistration({ id_event: id_event });
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

export async function deleteRegistrationAct(id_event: number): Promise<boolean> {
    const result = await deleteRegistration(id_event);
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result.success;
}
