import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {RamMainService} from "../services/ram-main.service";
import {CharacterModel, HttpResponse} from "../models/character.model";
import {GetCharacterDetailsAction, GetCharactersAction} from "./ram.action";
import {PagingModel} from "../models/other.model";

export interface RamStateModel {
  response: HttpResponse,
  character: CharacterModel | null;
  characters: CharacterModel[] | [];
  paging: PagingModel,
  ramLoading: boolean
}

@State<RamStateModel>({
  name: 'ram',
  defaults: {
    response: {},
    character: null,
    characters: [],
    paging: {
      pages: 1,
      pageNumber: 1,
      count: 1,
    },
    ramLoading: false
  },
})
@Injectable()
export class RamState {

  constructor(
    private readonly ramService: RamMainService,
  ) {
  }

  @Selector()
  public static getResponse({response}: RamStateModel): HttpResponse {
    return response;
  }

  @Selector()
  public static getCharacter({character}: RamStateModel): CharacterModel | null {
    return character;
  }

  @Selector()
  public static getCharacters({characters}: RamStateModel): CharacterModel[] {
    return characters;
  }

  @Selector()
  public static paging({paging}: RamStateModel): PagingModel {
    return paging;
  }

  @Selector()
  public static ramLoading({ramLoading}: RamStateModel): boolean {
    return ramLoading;
  }

  @Action(GetCharactersAction)
  getRamCharacters(
    {getState, patchState}: StateContext<RamStateModel>,
    {pageNumber, filters}: GetCharactersAction
  ) {
    patchState({
      ramLoading: true,
    });
    return this.ramService.getCharacters({page: pageNumber, ...filters})
      .pipe(
        tap((value) => {
          patchState({
            ramLoading: false,
            characters: value?.results,
            paging: {
              pageNumber: pageNumber,
              count: value?.info?.count,
              pages: value?.info?.pages
            }
          });
        }),
        catchError((err) => {
          patchState({
            ramLoading: false,
          });
          return throwError(err);
        }),
      );
  }

  @Action(GetCharacterDetailsAction)
  getCharacterDetail(
    {getState, patchState}: StateContext<RamStateModel>,
    {id}: GetCharacterDetailsAction) {
    patchState({
      ramLoading: true,
    });
    return this.ramService.getCharacterDetail(id)
      .pipe(
        tap((value) => {
          patchState({
            character: value,
            ramLoading: false
          });
        }),
        catchError((err) => {
          patchState({
            ramLoading: false,
          });
          return throwError(err);
        }),
      );
  }
}
