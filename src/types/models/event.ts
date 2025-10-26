// models/event.ts
import {Tables, TablesInsert, TablesUpdate} from '../database'

export type Event = Tables<'evt_data'>
export type EventInsert = TablesInsert<'evt_data'>
export type EventUpdate = TablesUpdate<'evt_data'>
export type EventWithRegistration = Event & { is_registered?: boolean }
