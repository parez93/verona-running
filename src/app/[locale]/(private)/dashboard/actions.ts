"use server";

import {dashboardData} from "@/app/api/dashboardApi";


export async function dashboardDataAct() {

    const result = await dashboardData();
    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

