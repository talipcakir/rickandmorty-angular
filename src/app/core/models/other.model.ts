export interface PagingModel {
  pages?: number,
  pageNumber: number,
  count?: number
}

export interface FilterModel {
  gender?: GenderEnum,
  name?: string,
  species?: string,
  status?: StatusEnum,
  type?: string
}

export enum StatusEnum {
  alive = "Alive",
  dead = "Dead",
  unknown = "Unknown"
}

export enum GenderEnum {
  female = "Female",
  male = "Male",
  genderless = "Genderless",
  unknown = "Unknown"
}
