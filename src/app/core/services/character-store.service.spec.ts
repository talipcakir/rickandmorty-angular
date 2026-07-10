import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CharacterStore } from './character-store.service';

describe('CharacterStore', () => {
  let store: CharacterStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    store = TestBed.inject(CharacterStore);
  });

  it('starts on page 1 with no active filter', () => {
    expect(store.page()).toBe(1);
    expect(store.filter()).toEqual({});
  });

  it('updates the current page', () => {
    store.goToPage(3);
    expect(store.page()).toBe(3);
  });

  it('resets to the first page when a new filter is applied', () => {
    store.goToPage(4);
    store.applyFilter({ name: 'rick' });

    expect(store.page()).toBe(1);
    expect(store.filter()).toEqual({ name: 'rick' });
  });
});
