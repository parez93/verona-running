import {ReactNode} from 'react'
import {getUserSession} from '@/lib/supabase/auth'
import {redirect} from "next/navigation";
import {ROUTES} from "@/lib/kRoutes";
import AdminAppLayout from "@/components/layout/AdminAppLayout";
import {userByIdAct} from "@/app/[locale]/admin/actions";

export default async function PrivateRouteLayout({ children }: { children: ReactNode }) {
    const user = await userByIdAct()

    if (!user) {
        // Redirects on the server
        throw redirect(ROUTES.signin())
    }
    if (!user.is_admin) {
        // Redirects on the server
        throw redirect(ROUTES.dashboard())
    }

    console.log('admin')
    return (
        <AdminAppLayout name={user.name!} surname={user.surname!} email={user.email!}
                        isAdmin={user.is_admin!}>
            {children}
        </AdminAppLayout>
    )
}
