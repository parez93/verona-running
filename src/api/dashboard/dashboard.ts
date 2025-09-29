import {Event} from "@/api/event/event";

export type DashboardData = {
    nextEvent: Event | null;
    events: Event[];
}
