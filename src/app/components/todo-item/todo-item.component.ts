import { Component, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Task } from '../../types/task.type';
import { LucideAngularModule, CheckCircle2Icon, CircleIcon, ChevronDownIcon } from 'lucide-angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [NgClass, LucideAngularModule, NgIf],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})

export class TodoItemComponent {
  readonly checkCircle2Icon = CheckCircle2Icon;
  readonly circleIcon = CircleIcon;
  readonly chevronDownIcon = ChevronDownIcon;
  task = input.required<Task>();
  complete = output<number>();
  descVisible = signal(false);

  toggleCompleted() {
    this.complete.emit(this.task().id);
  }

  toggleDescription() {
    this.descVisible.update(visible => !visible);
  }
}
