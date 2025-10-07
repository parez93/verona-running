"use server";

import {createClient} from '@/utils/supabase/server'
import {createBugReport} from "@/api/bug_report/bugReportService";
import {BugReport} from "@/api/bug_report/bugreport";


export async function createBugReportAction(input: BugReport) {

    const supabase = await createClient()

    const result = await createBugReport(supabase, input);

    return result;
}

