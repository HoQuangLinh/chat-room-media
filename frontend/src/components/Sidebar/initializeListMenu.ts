import { IMenuItem } from '@/interfaces/components/ListMenu'
import { IoMdAdd } from 'react-icons/io'
import { AiFillHome, AiOutlineFile } from 'react-icons/ai'
import { BiGroup } from 'react-icons/bi'
import { path } from '@/const/path'
export const initializeListMenu: IMenuItem[] = [
  {
    icon: AiFillHome,
    title: 'Manager',
    path: path.home
  },

  {
    icon: BiGroup,
    title: 'Rooms',
    children: []
  }
]
