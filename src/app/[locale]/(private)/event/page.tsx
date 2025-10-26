import {EventsGrid} from "@/components/event/EventsGrid";
import {EventWithRegistration} from "@/types/models/event";
import {eventsWithRegistrationAct} from "@/app/[locale]/(private)/event/actions";

export default async function EventsPage() {
    const events: EventWithRegistration[] = await eventsWithRegistrationAct();

    return (
        <div className="min-h-screen bg-background">
            <EventsGrid events={events}/>
        </div>
    )
}
