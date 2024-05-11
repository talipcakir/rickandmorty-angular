import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {GetCharacterDetailsAction, GetCharactersAction} from "../../core/states/ram.action";
import {RamState} from "../../core/states/ram.state";
import {Observable, Subject, takeUntil} from "rxjs";
import {CharacterModel} from "../../core/models/character.model";
import {AsyncPipe, DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {ComponentsModule} from "../components.module";
import {PagingModel} from "../../core/models/other.model";

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinner,
    NgIf,
    FlexLayoutModule,
    NgOptimizedImage,
    MatListModule,
    MatCardModule,
    DatePipe,
    ComponentsModule,
  ],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css'
})
export class CharacterDetailComponent implements OnInit, OnDestroy {

  @Select(RamState.getCharacter)
  character$: Observable<CharacterModel>;
  character: CharacterModel;
  @Select(RamState.ramLoading)
  loading$: Observable<boolean>;

  @Select(RamState.paging)
  paging$: Observable<PagingModel>;
  paging: PagingModel;

  protected subscriptions$: Subject<boolean> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      let {id} = params;
      if (id) {
        this.store.dispatch([
          new GetCharacterDetailsAction(id),
          new GetCharactersAction(1)
        ]);
      }
    });
  }

  ngOnInit(): void {
    this.character$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((character: CharacterModel) => {
        this.character = character;
      });
    this.paging$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((paging: PagingModel) => {
        this.paging = paging;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.next(true);
    this.subscriptions$.complete();
  }

  changeCharacter($event: number) {
    this.router.navigate([`/character/${$event}`]).then();
  }
}
