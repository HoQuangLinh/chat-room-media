import Header from '@/components/header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <div>
          <Sidebar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
