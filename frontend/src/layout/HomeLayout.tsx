import Sidebar from '@/components/Sidebar'
import { initialData } from '@/redux/actions/initialData'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(initialData())
  }, [])
  return (
    <div>
      <div className='flex h-screen'>
        <Sidebar />
        <div className='ml-64 w-full bg-[#313338] p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
