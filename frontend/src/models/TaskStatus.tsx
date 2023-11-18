export enum TaskStatus {
    InProgress,
    Blocked,
    Completed,
}

// Add a mapped type for text values
export type TaskStatusText = {
    [K in TaskStatus]: string
}

// Define the status values with corresponding text
export const TaskStatusText: TaskStatusText = {
    [TaskStatus.InProgress]: 'En cours',
    [TaskStatus.Blocked]: 'Bloqué',
    [TaskStatus.Completed]: 'Terminé',
}

export const allTaskStatus: TaskStatus[] = [TaskStatus.InProgress, TaskStatus.Blocked, TaskStatus.Completed]
