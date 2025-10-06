"use server";

import { createClient } from '@/utils/supabase/server'
import {fetchAccount, updateAccount} from "@/api/account/accountService";
import {AccountUpdate} from "@/api/account/account";
import {fetchEvents} from "@/api/event/eventService";
import {DashboardData} from "@/api/dashboard/dashboard";


export async function fetchDashboardAction(): Promise<DashboardData> {

    const supabase = await createClient()

    const events = await fetchEvents(supabase);
    const account = await fetchAccount(supabase);

    const dashboardData: DashboardData = {
        nextEvent: events.items.length > 0 ? events.items.filter(event => new Date(event.datetime) > new Date()).reduce((closest, current) => {
            const currentDate = new Date(current.datetime);
            const closestDate = new Date(closest.datetime);

            const currentDiff = currentDate.getTime() - new Date().getTime();
            const closestDiff = closestDate.getTime() - new Date().getTime();

            return currentDiff < closestDiff ? current : closest;
        }) : null,
        events: events.items,
        user: account
    }
    return dashboardData;
}

