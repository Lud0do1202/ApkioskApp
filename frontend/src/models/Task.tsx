import {TaskStatus} from './TaskStatus'
import {User} from './User'

export interface Task {
    id: number
    user: User
    label: string
    status: TaskStatus
}
