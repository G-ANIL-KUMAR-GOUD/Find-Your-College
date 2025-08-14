import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html'
})
export class FilterFormComponent {
  rank: number | null = null;
  gender: string = '';
  branch: string = '';

  @Output() filterChange = new EventEmitter<any>();

  applyFilters() {
    this.filterChange.emit({ rank: this.rank, gender: this.gender, branch: this.branch });
  }
}
