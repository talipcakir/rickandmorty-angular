import {FilterModel} from "../models/other.model";

export class GetCharactersAction {
  public static readonly type = '[RAM] get Characters ';

  constructor(public pageNumber: number, public filters?: FilterModel) { }
}
export class GetCharacterDetailsAction {
  public static readonly type = '[RAM] get Character Detail ';

  constructor(public id: number) { }
}
