import { IMenuItem } from '@/interfaces/ListMenu'
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
    icon: AiOutlineFile,
    title: 'My Files',
    path: path.files
  },
  {
    icon: BiGroup,
    title: 'Rooms',
    children: [
      {
        title: 'Room1',
        path: path.rooms
      },
      {
        title: 'Room2',
        path: path.rooms
      }
    ]
  },
  {
    icon: BiGroup,
    title: 'All rooms',
    path: path.rooms,
    children: [
      {
        title: 'Room1',
        path: path.rooms
      },
      {
        title: 'Room2',
        path: path.rooms
      },
      {
        title: 'Room3',
        path: path.rooms
      }
    ]
  }
]
