import {createSupabaseServerClient} from "@/lib/supabase/server";
import {User} from "@/types/models/user";
import {NextResponse} from "next/server";

// userList
export async function GET(req: Request) {
    const supabase = await createSupabaseServerClient()


    const {data, error} = await supabase.from('psn_data').select('*')
    if (error) {
        return NextResponse.json({ error: error?.message ?? "Internal error" }, { status: 500 });
    }
    return NextResponse.json({ data:  data as User[] });
}
