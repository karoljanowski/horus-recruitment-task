import { TaskStatus } from "./task.type";

export type FilterCriteria = {
    name: string;
    dateStart: string;
    dateEnd: string;
    status: TaskStatus | 'All';
}