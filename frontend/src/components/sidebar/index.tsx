import { Link, NavLink } from 'react-router-dom'
import { path } from '../../const/path'
import { listMenu } from './listMenu'

const Sidebar = () => {
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
            return (
              <NavLink
                to={item.path || ''}
                key={index}
                className={`flex w-full cursor-pointer items-center rounded-md px-2 font-semibold hover:bg-greyCt ${
                  item.title === 'Home' ? 'text-whiteCt' : 'text-greyLabelCt'
                }`}
              >
                <item.icon className='text-xl' />
                <div className='ml-2 py-3'>{item.title}</div>
              </NavLink>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
