import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {GetCharacterDetailsAction} from "../../core/states/ram.action";
import {RamState} from "../../core/states/ram.state";
import {Observable, Subject, takeUntil} from "rxjs";
import {CharacterModel} from "../../core/models/character.model";
import {AsyncPipe, DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";

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

  protected subscriptions$: Subject<boolean> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      let {id} = params;
      if (id) {
        this.store.dispatch(new GetCharacterDetailsAction(id));
      }
    });
  }

  ngOnInit(): void {
    this.character$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((character: CharacterModel) => {
        this.character = character;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.next(true);
    this.subscriptions$.complete();
  }

}
