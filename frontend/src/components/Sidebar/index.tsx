import { Link, NavLink } from 'react-router-dom'
import { path } from '../../const/path'
import { initializeListMenu } from './initializeListMenu'
import { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import { useRootSelector } from '@/redux/reducers'
import { keyStorage } from '../../const/keyStorage'

const Sidebar = () => {
  const [listMenu, setListMenu] = useState(initializeListMenu)
  const roomSelector = useRootSelector((item) => item.room)
  useEffect(() => {
    localStorage.setItem(keyStorage.indexSidebarActive, '0')
  }, [])
  useEffect(() => {
    if (!roomSelector || roomSelector.myRooms.length === 0) {
      return
    }
    const { myRooms } = roomSelector
    const newListMenu = [...listMenu]
    const indexMenu = listMenu.findIndex((item) => item.title === 'Rooms')
    newListMenu[indexMenu] = {
      ...newListMenu[indexMenu],
      children: myRooms.map((item) => {
        return {
          title: item.name,
          path: `room/${item._id}`,
          isActive: item.receiveMessage
        }
      })
    }
    setListMenu(newListMenu)
  }, [roomSelector?.myRooms])
  return (
    <div className='fixed flex h-screen w-64 flex-col justify-between bg-greyCt'>
      <div className='flex-1 bg-blackCt px-2 py-3'>
        <Link
          to={path.home}
          className='mb-1 inline-block cursor-pointer px-2 py-3 text-3xl font-bold text-whiteCt'
        >
          Zoom Bee
        </Link>
        <ul>
          {listMenu.map((item, index) => {
            return <MenuItem index={index.toString()} item={item} />
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
