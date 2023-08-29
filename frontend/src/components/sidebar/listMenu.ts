import { TListMenu } from '@/interfaces/ListMenu'
import { AiFillHome, AiOutlineFile } from 'react-icons/ai'
import { BiGroup } from 'react-icons/bi'
import { path } from '../../const/path'
export const listMenu: TListMenu[] = [
  {
    icon: AiFillHome,
    title: 'Home',
    path: path.home
  },

  {
    icon: AiOutlineFile,
    title: 'My Files',
    path: path.files
  },
  {
    icon: BiGroup,
    title: 'Rooms',
    path: path.rooms
  }
]
