import { cookies } from 'next/headers'

export interface UserFromCookie {
    id: string
    email: string
}


export async function getUserFromCookie(): Promise<UserFromCookie | null> {
    const cookieStore = await cookies()

    // Trova il cookie che termina con -auth-token
    let authCookie = cookieStore.getAll().find(c => c.name.endsWith('-auth-token'))?.value
    if (!authCookie) return null

    try {
        authCookie=authCookie.substring('base64-'.length, authCookie.length)
        const cookieBuffer = Buffer.from(authCookie, 'base64')
        const base64 = cookieBuffer.toString('utf-8')
        const payload = JSON.parse(base64)

        return {
            id: payload.user.id,
            email: payload.user.email
        }
    } catch {
        return null
    }
}
