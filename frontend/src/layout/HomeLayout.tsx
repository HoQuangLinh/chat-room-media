import Sidebar from '@/components/Sidebar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { initialData } from '../redux/actions/initialData'

const HomeLayout = () => {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(initialData())
  }, [])
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
