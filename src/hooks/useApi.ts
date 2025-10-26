import useSWR, { SWRConfiguration } from 'swr'
import { api } from '@/lib/api/apiClient'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface UseApiOptions<T> extends SWRConfiguration {
    method?: Method
    body?: any
}

/**
 * Hook generico per GET (tipizzato)
 */
export function useApi<T = any>(url: string, options?: SWRConfiguration) {
    const fetcher = (url: string) => api.get<T>(url)
    const { data, error, mutate, isValidating } = useSWR<T>(url, fetcher, options)
    return { data, error, loading: !data && !error, mutate, isValidating }
}

/**
 * Hook generico per POST / PUT / DELETE con cache SWR
 */
export function useMutation<T = any, B = any>(url: string, method: Exclude<Method, 'GET'>) {
    const mutateFn = async (body?: B, swrKey?: string) => {
        let result: T

        switch (method) {
            case 'POST':
                result = await api.post<T, B>(url, body)
                break
            case 'PUT':
                result = await api.put<T, B>(url, body)
                break
            case 'DELETE':
                result = await api.delete<T>(url)
                break
            default:
                throw new Error('Invalid method for mutation')
        }

        // Aggiorna cache SWR se specificata
        if (swrKey) {
            await (await import('swr')).mutate(swrKey)
        }

        return result
    }

    return mutateFn
}


/*
Esempio d’uso in un componente
import { useApi, useMutation } from '@/lib/hooks/useApiClient'
import { apiRoutes } from '@/lib/apiRoutes'
import { Event } from '@/types/models/event'

// 🔹 GET eventi futuri
const { data: upcomingEvents, loading } = useApi<Event[]>(apiRoutes.events.upcoming)

// 🔹 POST nuovo evento
const createEvent = useMutation<Event, Partial<Event>>(apiRoutes.events.base, 'POST')
await createEvent({ title: 'Nuovo Evento', datetime: '2025-12-01T10:00:00Z' }, apiRoutes.events.upcoming)

// 🔹 PUT aggiornamento evento
const updateEvent = useMutation<Event, Partial<Event>>(apiRoutes.events.byId(5), 'PUT')
await updateEvent({ title: 'Titolo Aggiornato' }, apiRoutes.events.upcoming)

// 🔹 DELETE evento
const deleteEvent = useMutation<null>(apiRoutes.events.byId(5), 'DELETE')
await deleteEvent(undefined, apiRoutes.events.upcoming)*/
