// models/user.ts
import {Tables, TablesInsert, TablesUpdate} from '../database'

export type User = Tables<'psn_data'>
export type UserInsert = TablesInsert<'psn_data'>
export type UserUpdate = TablesUpdate<'psn_data'>
