import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/**
 * Thin, strongly-typed wrapper around `mat-paginator` that emits a 1-based
 * page number (the value the Rick and Morty API expects).
 */
@Component({
  selector: 'app-pagination',
  imports: [MatPaginatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-paginator
      [length]="length()"
      [pageSize]="pageSize()"
      [pageIndex]="pageIndex()"
      [disabled]="disabled()"
      hidePageSize
      (page)="onPage($event)"
    />
  `,
})
export class PaginationComponent {
  readonly length = input(0);
  readonly pageSize = input(20);
  readonly pageIndex = input(0);
  readonly disabled = input(false);

  readonly pageChange = output<number>();

  onPage(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex + 1);
  }
}
