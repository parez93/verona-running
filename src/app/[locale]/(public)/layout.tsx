import {ReactNode} from "react";
import CookieBanner from "@/components/cookie-policy/CookieBanner";

export default async function PublicRouteLayout({children}: { children: ReactNode }) {
    return (
        <>
            {children}
            <CookieBanner/>
        </>
    )
}
