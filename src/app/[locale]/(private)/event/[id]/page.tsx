import * as React from "react";
import {EventWithRegistration} from "@/types/models/event";
import EventDetail from "@/components/event/EventDetail";
import {eventWithRegistrationAct} from "@/app/[locale]/(private)/event/actions";


interface EventDetailPageProps {
    params: { id: string }
}

export default async function EventDetailPage({params}: EventDetailPageProps) {
    const {id} = await params;

    const event: EventWithRegistration = await eventWithRegistrationAct(Number(id));

    return (
        <EventDetail event={event}/>
    );

}
