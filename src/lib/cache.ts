
export const CACHE_KEY = {
    events: () => `events`,
};


const cache: Record<string, { data: any; ts: number }> = {};

export const getCached = (key: string, ttl = 60000) => {
    const entry = cache[key];
    if (!entry) return null;
    if (Date.now() - entry.ts > ttl) {
        delete cache[key];
        return null;
    }
    return entry.data;
};

export const setCache = (key: string, data: any) => {
    cache[key] = { data, ts: Date.now() };
};
