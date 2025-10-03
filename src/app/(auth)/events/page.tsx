import {Event, EventWithRegistration} from "@/api/event/event";
import {EventsGrid} from "@/components/event/EventsGrid";
import {fetchEventsAction} from "@/app/(auth)/events/actions";

export default async function EventsPage() {

    const data: { items: EventWithRegistration[]; count: number } = await fetchEventsAction();
    const events: EventWithRegistration[] = data.items;

    return (
        <div className="min-h-screen bg-background">
            <EventsGrid events={events}/>
        </div>
    )
}
