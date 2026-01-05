// /lib/validation/notification.ts
import { z } from "zod";

export const NotificationCreateSchema = z.object({
    type: z.enum(["badge", "event", "challenge", "leaderboard", "software", "achievement"]),
    title: z.string().min(1),
    message: z.string().min(1),
    icon: z.string().optional().nullable(),
    actionUrl: z.string().url().optional().nullable(),
    assignToAll: z.boolean().optional().default(false),
    assignedUsers: z.array(z.string().uuid()).optional(), // array of psn_id UUIDs
    meta: z.record(z.any(), z.any()).optional().nullable()
});

export const NotificationUpdateSchema = NotificationCreateSchema.partial().extend({
    id: z.number().optional()
});

export type NotificationCreateInput = z.infer<typeof NotificationCreateSchema>;
export type NotificationUpdateInput = z.infer<typeof NotificationUpdateSchema>;
