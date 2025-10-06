import {Event} from "@/api/event/event";
import {Account} from "@/api/account/account";

export type DashboardData = {
    nextEvent: Event | null;
    user: Account | null;
    events: Event[];
}
