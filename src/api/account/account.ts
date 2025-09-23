export type Account = {
    id: number
    uuid: string
    edited_at?: string
    img_base64?: string
    name?: string
    surname?: string
    date_of_birth?: string
}

export type AccountUpdate = {
    edited_at?: string
    img_base64?: string
    name?: string
    surname?: string
    date_of_birth?: string
}

