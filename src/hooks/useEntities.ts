import { useApi, useMutation } from './useApi'
import { apiRoutes } from '@/lib/api/apiRoutes'
import {Event, EventWithRegistration} from '@/types/models/event'
import { User } from '@/types/models/user'
import { Registration } from '@/types/models/registration'
import { BugReport } from '@/types/models/bugreport'

// -------------------- EVENTS --------------------
export const useEvents = () => {
    const list = () => useApi<Event[]>(apiRoutes.events.base)
    const create = () => useMutation<Event, Partial<Event>>(apiRoutes.events.base, 'POST')
    const update = (id: number | string) => useMutation<Event, Partial<Event>>(apiRoutes.events.byId(id), 'PUT')
    const remove = (id: number | string) => useMutation<null>(apiRoutes.events.byId(id), 'DELETE')
    const upcoming = () => useApi<Event[]>(apiRoutes.events.upcoming)
    const withRegistration = () => useApi<EventWithRegistration[]>(apiRoutes.events.withRegistration)

    return { list, create, update, remove, upcoming, withRegistration }
}

// -------------------- USERS --------------------
export const useUsers = () => {
    const list = () => useApi<User[]>(apiRoutes.users.base)
    const create = () => useMutation<User, Partial<User>>(apiRoutes.users.base, 'POST')
    const update = (id: string) => useMutation<User, Partial<User>>(apiRoutes.users.byId(id), 'PUT')
    const remove = (id: string) => useMutation<null>(apiRoutes.users.byId(id), 'DELETE')

    return { list, create, update, remove }
}

// -------------------- REGISTRATIONS --------------------
export const useRegistrations = () => {
    const list = () => useApi<Registration[]>(apiRoutes.registrations.base)
    const create = () => useMutation<Registration, Partial<Registration>>(apiRoutes.registrations.base, 'POST')
    const remove = (id: number | string) => useMutation<null>(apiRoutes.registrations.byId(id), 'DELETE')

    return { list, create, remove }
}

// -------------------- BUG REPORTS --------------------
export const useBugReports = () => {
    const list = () => useApi<BugReport[]>(apiRoutes.bugReports.base)
    const create = () => useMutation<BugReport, Partial<BugReport>>(apiRoutes.bugReports.base, 'POST')
    const update = (id: number | string) => useMutation<BugReport, Partial<BugReport>>(apiRoutes.bugReports.byId(id), 'PUT')
    const remove = (id: number | string) => useMutation<null>(apiRoutes.bugReports.byId(id), 'DELETE')
    const byCategory = (category: string) => useApi<BugReport[]>(apiRoutes.bugReports.byCategory(category))
    const byPriority = (priority: string) => useApi<BugReport[]>(apiRoutes.bugReports.byPriority(priority))

    return { list, create, update, remove, byCategory, byPriority }
}

// -------------------- HEALTH CHECK --------------------
export const useHealth = () => {
    const health = () => useApi<{ status: string }>(apiRoutes.system.health)
    return { health }
}

/*
2️⃣ Esempio di utilizzo in un componente
import { useEvents, useUsers, useBugReports } from '@/lib/hooks/useEntities'

export default function Dashboard() {
    const { list: listEvents, create: createEvent } = useEvents()
    const { list: listUsers } = useUsers()
    const { list: listBugs, byPriority } = useBugReports()

    const { data: events } = listEvents()
    const { data: users } = listUsers()
    const { data: bugs } = listBugs()
    const { data: highBugs } = byPriority('high')

    const handleCreateEvent = async () => {
        await createEvent()({ title: 'Evento Nuovo', datetime: new Date().toISOString() }, apiRoutes.events.base)
    }

    return (
        <div>
            <h1>Dashboard</h1>
        <h2>Eventi ({events?.length})</h2>
    <button onClick={handleCreateEvent}>Crea Evento</button>

    <h2>Utenti ({users?.length})</h2>
    <ul>{users?.map(u => <li key={u.id}>{u.name}</li>)}</ul>

    <h2>Bug Reports ({bugs?.length})</h2>
    <ul>{bugs?.map(b => <li key={b.id}>{b.title} - {b.priority}</li>)}</ul>

    <h2>Bug Reports Alta Priorità ({highBugs?.length})</h2>
    <ul>{highBugs?.map(b => <li key={b.id}>{b.title}</li>)}</ul>
    </div>
)
}
*/
