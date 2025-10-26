import {apiRoutes} from './apiRoutes'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiOptions<T = any> {
    method?: HttpMethod
    body?: T
    headers?: Record<string, string>
}

export const api = {
    get: async <T = any>(url: string): Promise<T> => {
        const res = await fetch(url)
        console.log("-->", res.ok, res.status, res.statusText, res.body)
        if (!res.ok) throw new Error(`API GET error: ${res.status} ${res.statusText}`)
        return res.json()
    },

    post: async <T = any, B = any>(url: string, body?: B): Promise<T> => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        })
        if (!res.ok) throw new Error(`API POST error: ${res.status} ${res.statusText}`)
        return res.json()
    },

    put: async <T = any, B = any>(url: string, body?: B): Promise<T> => {
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        })
        if (!res.ok) throw new Error(`API PUT error: ${res.status} ${res.statusText}`)
        return res.json()
    },

    delete: async <T = any>(url: string): Promise<T> => {
        const res = await fetch(url, { method: 'DELETE' })
        if (!res.ok) throw new Error(`API DELETE error: ${res.status} ${res.statusText}`)
        return res.json()
    },
}


/*💡 Esempi d’uso
import { api } from '@/lib/apiClient'
import { apiRoutes } from '@/lib/apiRoutes'
import { Event, User } from '@/types/models'

// 1️⃣ Recupera eventi futuri
const upcomingEvents: Event[] = await api.get(apiRoutes.events.upcoming)

// 2️⃣ Recupera eventi di un utente
const userEvents: Event[] = await api.get(apiRoutes.users.events('user123'))

// 3️⃣ Crea un nuovo utente
const newUser: User = await api.post(apiRoutes.users.base, {
    name: 'Mario',
    surname: 'Rossi',
    date_of_birth: '1990-01-01',
})

// 4️⃣ Aggiorna un bug report
await api.put(apiRoutes.bugReports.byId(12), { priority: 'high' })

// 5️⃣ Cancella una registrazione
await api.delete(apiRoutes.registrations.byId(5))*/

