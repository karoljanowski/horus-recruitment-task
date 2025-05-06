import { Component, signal } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ModalComponent } from '../modal/modal.component';
import { FiltersComponent } from '../filters/filters.component';
import { Task, TaskStatus } from '../../types/task.type';
import { LucideAngularModule, PlusIcon } from 'lucide-angular';
import { FilterCriteria } from '../../types/filters.type';
import { TaskFilterPipe } from '../../pipes/task-filter.pipe';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, LucideAngularModule, ModalComponent, FiltersComponent, TaskFilterPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  readonly PlusIcon = PlusIcon;
  readonly INITIAL_FILTERS: FilterCriteria = {
    name: '',
    dateStart: '',
    dateEnd: '',
    status: 'All'
  };
  tasks = signal<Task[]>([
    { id: 1, name: 'Zrobić zakupy spożywcze', status: 'Completed' as TaskStatus, date: '2025-05-01', description: 'Muszę kupić mleko, mąkę i jajka.' },
    { id: 2, name: 'Opłacić rachunki', status: 'Pending' as TaskStatus, date: '2025-05-10', description: 'Tylko nie odkładaj tego na inny dzień!' },
    { id: 3, name: 'Urodziny mamy', status: 'Planned' as TaskStatus, date: '2025-05-15', description: 'Kupić kwiaty i tort.' }
  ]);
  currentFilter = signal<FilterCriteria>(this.INITIAL_FILTERS);
  isModalOpen = signal(false);

  handleCompleted(id: number) {
    this.tasks.update(tasks => tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'Completed' ? ('Pending' as TaskStatus) : ('Completed' as TaskStatus) } : task
    ));
  }

  handleNewTask(task: Task) {
    const newTask = { ...task, id: this.tasks().length + 1 };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.isModalOpen.set(false);
  }

  toggleModal(open: boolean) {
    this.isModalOpen.set(open);
  }

  handleFilter(filter: FilterCriteria) {
    this.currentFilter.set(filter);
  }

  resetFilters() {
    this.currentFilter.set(this.INITIAL_FILTERS);
  }
}
