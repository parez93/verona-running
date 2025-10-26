import {redirect} from "next/navigation";
import {ROUTES} from "@/lib/kRoutes";
import PrivateAppLayout from "@/components/layout/PrivateAppLayout";
import {userByIdAct} from "@/app/[locale]/(private)/actions";
import {ReactNode} from "react";

export default async function PrivateRouteLayout({ children }: { children: ReactNode }) {

    let user = null;
    try {
        user = await userByIdAct()
    } catch (error) {
        redirect(ROUTES.signin());
    }


    if (!user) {
        // Redirects on the server
        throw redirect(ROUTES.signin())
    }



/*
    console.log('private', user)
*/

    return (
        <PrivateAppLayout name={user!.name!} surname={user!.surname!} email={user!.email!}
                        isAdmin={user!.is_admin!}>
            {children}
        </PrivateAppLayout>
    )
}
