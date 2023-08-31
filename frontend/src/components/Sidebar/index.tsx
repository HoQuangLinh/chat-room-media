import { Link, NavLink } from 'react-router-dom'
import { path } from '../../const/path'
import { initializeListMenu } from './initializeListMenu'
import { useState } from 'react'
import MenuItem from './MenuItem'

const Sidebar = () => {
  const [listMenu, setListMenu] = useState(initializeListMenu)
  return (
    <div className='fixed flex h-screen w-64 flex-col justify-between bg-greyCt'>
      <div className='flex-1 rounded-b-3xl bg-blackCt px-2 py-3'>
        <Link
          to={path.home}
          className='mb-1 inline-block cursor-pointer px-2 py-3 text-3xl font-bold text-whiteCt'
        >
          Zoom Bee
        </Link>
        <ul>
          {listMenu.map((item, index) => {
            return <MenuItem item={item} />
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
