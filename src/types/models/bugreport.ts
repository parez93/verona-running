// models/bugreport.ts
import {Tables, TablesInsert, TablesUpdate} from '../database'

export type BugReport = Tables<'sys_bugreport'>
export type BugReportInsert = TablesInsert<'sys_bugreport'>
export type BugReportUpdate = TablesUpdate<'sys_bugreport'>
