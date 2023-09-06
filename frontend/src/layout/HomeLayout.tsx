import Sidebar from '@/components/Sidebar'
import { initialData } from '@/redux/actions/initialData'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import CallModal from '../components/CallModal'

const HomeLayout = () => {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(initialData())
  }, [])
  return (
    <div>
      <div className='flex min-h-screen bg-[#313338] '>
        <Sidebar />
        <div className='ml-64 w-full  p-6'>
          <CallModal isOpen />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
