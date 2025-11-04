import {NextResponse} from 'next/server';
import {createSupabaseServerClient} from "@/lib/supabase/server";

export async function GET(req: Request) {
    const supabase = await createSupabaseServerClient();

    const {data: {user}} = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('vw_user_badges')
        .select('*')
        .eq('id_user', userId);

    console.log(data)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const supabase = await createSupabaseServerClient();
    const body = await req.json();
    const { id_user, id_badge, progress, unlocked } = body;

    if (!id_user || !id_badge)
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const { data, error } = await supabase
        .from('gam_user_badge')
        .upsert({
            id_user,
            id_badge,
            progress,
            unlocked,
            unlocked_at: unlocked ? new Date().toISOString() : null
        });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}
