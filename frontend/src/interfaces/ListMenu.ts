import { IconType } from 'react-icons'
export interface IMenuItem {
  icon?: IconType
  title: string
  path?: string
  children?: IMenuItem[]
}
