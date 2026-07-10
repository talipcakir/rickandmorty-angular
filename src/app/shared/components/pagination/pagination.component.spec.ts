import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('translates the 0-based paginator index into a 1-based page number', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const component = fixture.componentInstance;

    const emitted: number[] = [];
    component.pageChange.subscribe((page) => emitted.push(page));

    component.onPage({ pageIndex: 2, pageSize: 20, length: 100, previousPageIndex: 1 });

    expect(emitted).toEqual([3]);
  });
});
