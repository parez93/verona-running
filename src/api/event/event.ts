// Event entity as stored in the database
export type Event = {
    id: number
    title: string
    img: string
    datetime: string // ISO date string (YYYY-MM-DD or full ISO)
    info: string
    route_url: string
    location_url: string
    location_label: string
    created_at: string
    updated_at: string
    is_registered: boolean
}

export type EventWithRegistration = Event & {
    is_registered: boolean;
};

export type EventRegistration = {
    id?: number
    id_user?: string
    id_event: number
    created_at?: string
    updated_at?: string
}

// Payload for creating a new event (user_id will be injected by the service)
export type EventInsert = {
    title: string
    description: string | null
    date: string
    category: string | null
}

// Payload for updating an existing event (user_id will be enforced by the service for RLS compliance)
export type EventUpdate = {
    title?: string
    description?: string | null
    date?: string
    category?: string | null
}

export type FetchEventsParams = {
    search?: string
    category?: string | null
    page?: number
    pageSize?: number
    order?: { column: keyof Event; ascending: boolean }
}

export type FetchEventsResult = {
    items: Event[]
    count: number
}
