import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-options',
  templateUrl: './sort-options.component.html'
})
export class SortOptionsComponent {
  sortBy: string = '';
  order: string = 'asc';

  @Output() sortChange = new EventEmitter<any>();

  applySort() {
    this.sortChange.emit({ sortBy: this.sortBy, order: this.order });
  }
}
