import {TaskStatus} from "./TaskStatus"

export interface TaskEdit {
    id: number
    userId: number | null
    label: string
    status: TaskStatus
}