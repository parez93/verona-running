export type BugReport = {
    id?: string
    created_at?: string
    id_user?: string
    title: string
    description: string
    category: string
    priority: string
    attachment: string | null
    url: string | null
}
