import {TablesUpdate} from "@/types/database";

export type Notification = {
    id: number;
    title: string;
    message: string;
    type: string;          // se hai un enum, puoi sostituirlo
    icon: string;
    actionUrl: string;
    assignToAll: boolean;
    isRead: boolean;
    createdAt: string;      // oppure Date se fai il parsing
    updatedAt: string;
    viewedAt: string | null;
    meta: {
        admin_read: boolean;
        [key: string]: any;   // opzionale, se meta può avere altre chiavi
    };
}


