import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const res = await supabase.auth.signOut();

    return NextResponse.json({ res });
}
