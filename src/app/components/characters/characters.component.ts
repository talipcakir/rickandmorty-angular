import {Component, OnDestroy, OnInit} from '@angular/core';
import {RamState} from "../../core/states/ram.state";
import {CharacterModel} from "../../core/models/character.model";
import {Observable, Subject, takeUntil} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {GetCharactersAction} from "../../core/states/ram.action";
import {ComponentsModule} from "../components.module";
import {NgForOf} from "@angular/common";
import {FlexLayoutModule} from '@angular/flex-layout';
import {FilterModel, PagingModel} from "../../core/models/other.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ComponentsModule,
    NgForOf,
    FlexLayoutModule,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit, OnDestroy {

  @Select(RamState.getCharacters)
  characters$: Observable<CharacterModel[]>;
  characters: CharacterModel[];
  @Select(RamState.ramLoading)
  loading$: Observable<boolean>;
  loading: boolean;

  @Select(RamState.paging)
  paging$: Observable<PagingModel>;
  paging: PagingModel;
  page: number = 1;

  filter: FilterModel;

  protected subscriptions$: Subject<boolean> = new Subject();

  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCharactersAction(this.page));

    this.loading$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((loading) => {
        this.loading = loading;
      });
    this.characters$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((c) => {
        this.characters = c;
        this.paging$
          .pipe(takeUntil(this.subscriptions$))
          .subscribe((p) => {
            this.paging = p;
          });
      });
  }

  clickedCharacter($id: number) {
    this.router.navigate([`/character/${$id}`]).then();
  }

  pageChange($event: number) {
    this.page = $event;
    this.store.dispatch(new GetCharactersAction(this.page));
  }

  ngOnDestroy(): void {
    this.subscriptions$.next(true);
    this.subscriptions$.complete();
  }

  filterChange($event: FilterModel) {
    setTimeout(
      () => {
        let clearEvent = Object.fromEntries(Object.entries($event).filter(([_, v]) => v != null));
        if (this.filter === clearEvent) {
          return;
        }
        this.filter = clearEvent;
        this.store.dispatch(new GetCharactersAction(this.page, this.filter));
      }
      , 1000
    )
  }
}

