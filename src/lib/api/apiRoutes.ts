export const apiRoutes = {
    events: {
        base: '/api/events',
        byId: (id: number | string) => `/api/events/${id}`,
        upcoming: '/api/events/upcoming',
        past: '/api/events/past',
        search: (query: string) => `/api/events/search?query=${encodeURIComponent(query)}`,
        byLocation: (location: string) => `/api/events/location/${encodeURIComponent(location)}`,
/*
        withRegistration: (userId: string) => `/api/events/with-registration/${userId}`,
*/
        withRegistration: `/api/tmp/events/with-registration`,
        registration: (eventId: number | string, userId: string) =>
            `/api/events/${eventId}/registration/${userId}`,
    },

    registrations: {
        base: '/api/registrations',
        byId: (id: number | string) => `/api/registrations/${id}`,
        deleteUserEvent: (userId: string, eventId: number | string) =>
            `/api/registrations/user/${userId}/event/${eventId}`,
    },

    users: {
        base: '/api/users',
        byId: (id: string) => `/api/users/${id}`,
        registrations: (id: string) => `/api/users/${id}/registrations`,
        events: (id: string) => `/api/users/${id}/events`,
        bugReports: (id: string) => `/api/users/${id}/bugreports`,
    },

    bugReports: {
        base: '/api/bugreports',
        byId: (id: number | string) => `/api/bugreports/${id}`,
        byCategory: (category: string) => `/api/bugreports/category/${encodeURIComponent(category)}`,
        byPriority: (priority: string) => `/api/bugreports/priority/${encodeURIComponent(priority)}`,
    },

    system: {
        health: '/api/health',
        stats: {
            events: '/api/stats/events',
            users: '/api/stats/users',
            bugReports: '/api/stats/bugreports',
        },
    },
}
