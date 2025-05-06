export type Task = {
    id: number;
    name: string;
    status: TaskStatus;
    date: string;
    description: string;
};

export type TaskStatus = 'Completed' | 'Pending' | 'Planned';