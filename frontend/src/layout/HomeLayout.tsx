import Sidebar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div>
      <div className='flex h-screen'>
        <div>
          <Sidebar />
        </div>
        <div className='ml-64 w-full '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
