"use server";

import {Event, EventInsert, EventUpdate} from "@/types/models/event";
import {deleteEvent, eventList, makeEvent, updateEvent} from "@/app/api/eventApi";


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
