export type Task = {
    id: number;
    name: string;
    status: TaskStatus;
    date: string;
    description: string;
};

export type TaskStatus = 'Completed' | 'Pending' | 'Planned';

export enum TaskStatusEnum {
    Completed = 'Ukończone',
    Pending = 'W toku',
    Planned = 'Planowane'
}