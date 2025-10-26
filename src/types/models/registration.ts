// models/registration.ts
import {Tables, TablesInsert, TablesUpdate} from '../database'

export type Registration = Tables<'evt_registration'>
export type RegistrationInsert = TablesInsert<'evt_registration'>
export type RegistrationUpdate = TablesUpdate<'evt_registration'>
