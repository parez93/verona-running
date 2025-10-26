import {createSupabaseServerClient} from "@/lib/supabase/server";
import {BugReportInsert} from "@/types/models/bugreport";

export async function bugReportList() {
    try {
        const supabase = await createSupabaseServerClient();
        const {data, error} = await supabase.from('sys_bugreport').select('*');
        if (error) throw error;

        return data;
    } catch (error: any) {
        return {error: error.message};
    }
}

export async function makeBugReport(newBug: BugReportInsert) {
    try {
        const supabase = await createSupabaseServerClient();

        const {data, error} = await supabase.from('sys_bugreport').insert(newBug).select();
        if (error) throw error;

        return data[0];
    } catch (error: any) {
        return {error: error.message};
    }
}
