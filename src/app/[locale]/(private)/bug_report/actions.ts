"use server";

import {BugReportInsert} from "@/types/models/bugreport";
import {makeBugReport} from "@/app/api/bugreportApi";


export async function makeBugReportAct(input: BugReportInsert) {
    const result = await makeBugReport(input);

    if ("error" in result) {
        throw new Error(result.error)
    }

    return result;
}

