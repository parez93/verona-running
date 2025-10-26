import {NextRequest, NextResponse} from "next/server";
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {z} from "zod";
import {makeUser} from "@/app/api/userApi";
import {UserInsert} from "@/types/models/user";

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
    surname: z.string().min(2),
});

export async function POST(req: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({error: parsed.error.format()}, {status: 400});
    }

    const {email, password, name, surname} = parsed.data;

    console.log(name, email, password, name, surname);

    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: name + " " + surname,
                name: name, surname: surname
            },
        },
    });

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

    const newUser: UserInsert = {id: data.user?.id, name: name, surname: surname, img_base64: null, email: email};
    await makeUser(newUser);

    return NextResponse.json({data});
}
