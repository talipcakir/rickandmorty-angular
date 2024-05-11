import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input()
  length: any;
  @Input()
  pageSize: any;
  @Input()
  loading: boolean;

  @Output()
  page: EventEmitter<number> = new EventEmitter();

  pageChange($event: PageEvent) {
    this.page.emit($event.pageIndex + 1)
  }
}
