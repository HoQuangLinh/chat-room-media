import Header from '@/components/header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'

const HomeLayout = () => {
  return (
    <div>
      <div className='flex h-screen'>
        <div >
          <Sidebar />
        </div>
        <div className='ml-64 '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
