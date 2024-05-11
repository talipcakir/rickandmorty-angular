import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CharacterModel, HttpResponse} from "../models/character.model";

@Injectable({
  providedIn: 'root'
})
export class RamMainService {
  // TODO: then Environment should be
  defaultApi = "https://rickandmortyapi.com/api"

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getCharacters(paramList: any): Observable<HttpResponse | null> {
    return this.http
      .get<HttpResponse>(
        `${this.defaultApi}/character`,
        {
          params: paramList
        }
      )
      .pipe(
        map((val) => {
          if (val !== undefined) {
            return val;
          }
          return null;
        })
      );
  }

  getCharacterDetail(characterId: number): Observable<CharacterModel | null> {
    return this.http
      .get<CharacterModel>(
        `${this.defaultApi}/character/${characterId}`
      )
      .pipe(
        map((val) => {
          if (val !== undefined) {
            return val;
          }
          return null;
        })
      );
  }
}
