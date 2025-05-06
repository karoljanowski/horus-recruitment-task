import { Component, input, output, signal } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Task } from '../../types/task.type';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, FormsModule, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})

export class ModalComponent {
  INITIAL_TASK: Task = {
    id: 0,
    name: '',
    description: '',
    date: '',
    status: 'Pending'
  };
  open = input.required<boolean>();
  close = output<boolean>();
  taskEmitter = output<Task>();
  task = signal<Task>(this.INITIAL_TASK);

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  closeModal() {
    this.close.emit(false);
  }

  isDateInPast(date: string): boolean {
    if (!date) return false;
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  }

  addTask(form: NgForm) {
    const isDateValid = !this.isDateInPast(this.task().date);
    if (form.valid && isDateValid) {
      this.taskEmitter.emit(this.task());
      this.task.set(this.INITIAL_TASK);
      form.resetForm();
      this.closeModal();
    }
  }
}
