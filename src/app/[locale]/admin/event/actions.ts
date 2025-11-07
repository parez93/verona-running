"use server";

import {Event, EventInsert, EventUpdate} from "@/types/models/event";
import {deleteEvent, eventList, eventListWithRegistrations, makeEvent, updateEvent} from "@/app/api/eventApi";
import {deleteRegistration, deleteRegistrationById} from "@/app/api/registrationApi";


export async function eventListAct(): Promise<Event[]> {
    const result = await eventList();
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

export async function makeEventAct(input: EventInsert): Promise<Event> {
    const result = await makeEvent(input);
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

export async function updateEventAct(input: EventUpdate): Promise<Event> {
    //console.log(input)
    const result = await updateEvent(input);
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

export async function deleteEventAct(input: number) {

    const result = await deleteEvent(input);
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

export async function eventListWithRegistrationsAct(): Promise<any[]> {
    const result = await eventListWithRegistrations();
    if ("error" in result) {
        throw new Error(result.error)
    }
    return result;
}

// New: cancella una registrazione (admin)
export async function deleteRegistrationByIdAct(input: number) {
    const result = await deleteRegistrationById(input);
    if ("error" in result) {
        throw new Error(result.error)
    }
    return result;
}
