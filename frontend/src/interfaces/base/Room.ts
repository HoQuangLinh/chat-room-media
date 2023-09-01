export type TVisibility = 'public' | 'private'
export interface IRoom {
  _id: string
  name: string
  visibility: TVisibility
}
