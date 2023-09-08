import CallModal from '@/components/CallModal'
import Sidebar from '@/components/Sidebar'
import { initialData } from '@/redux/actions/initialData'
import peerService from '@/services/peer.service'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useRootSelector } from '../redux/reducers'
const HomeLayout = () => {
  const dispatch = useDispatch<any>()
  const call = useRootSelector((item) => item.call)

  useEffect(() => {
    dispatch(initialData())
    // peerService.initPeerInstance()
  }, [])

  return (
    <div>
      <div className='flex min-h-screen bg-[#313338] '>
        <Sidebar />
        <div className='ml-64 w-full  p-6'>
          <CallModal isOpen={!!call?.calling} />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
