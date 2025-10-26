import {User} from "@/types/models/user";
import {EventWithRegistration} from "@/types/models/event";

export type DashboardData = {
    user: User; // puoi sostituire `any` con il tipo reale di psn_data
    nextEvent: EventWithRegistration | null;
    stats: { eventsRun: number; kmRun: number };
};
