import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterCriteria } from '../../types/filters.type';
import { LucideAngularModule, FilterIcon } from 'lucide-angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule]
})
export class FiltersComponent {
  readonly filterIcon = FilterIcon;

  filters = input.required<FilterCriteria>();
  filterChange = output<FilterCriteria>();
  resetFilters = output<void>();

  onFilterChange(value: string, name: string): void {
    this.filterChange.emit({ ...this.filters(), [name]: value });
  }

  onResetFilters(): void {
    this.resetFilters.emit();
  }
}