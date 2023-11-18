import {Task} from './Task'

export type CrudTasks = (type: 'create' | 'read' | 'update' | 'delete', task: Task) => void
