import {TaskStatus} from './TaskStatus'
import {User} from './User'

export interface Task {
    id: number
    user: User | null
    label: string
    status: TaskStatus
}
