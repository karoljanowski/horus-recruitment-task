import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../types/task.type';
import { FilterCriteria } from '../types/filters.type';

@Pipe({
  name: 'taskFilter',
  standalone: true
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], filter: FilterCriteria): Task[] {
    if (!tasks || !filter) {
      return tasks;
    }

    return tasks.filter(task => {
      const nameMatch = !filter.name || task.name.toLowerCase().includes(filter.name.toLowerCase());
      const dateStartMatch = !filter.dateStart || task.date >= filter.dateStart;
      const dateEndMatch = !filter.dateEnd || task.date <= filter.dateEnd;
      const statusMatch = !filter.status || filter.status === 'All' || task.status === filter.status;
      
      return nameMatch && dateStartMatch && dateEndMatch && statusMatch;
    });
  }
} 