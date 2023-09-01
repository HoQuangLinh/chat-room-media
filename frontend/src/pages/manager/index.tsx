import { useRef } from 'react'
import Modal, { TModalHandles } from '@/components/Modal'
import NewRoom from '../../components/NewRoom'
import { useRootSelector } from '../../redux/reducers'

const Manager = () => {
  const modalRef = useRef<TModalHandles>(null)
  const roomSelector = useRootSelector((item) => item.room)
  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between px-12 pt-4'>
        <button onClick={() => modalRef.current?.openModal()}>New room</button>
      </div>
      <Modal ref={modalRef} className='h-[500px] w-[500px]'>
        <NewRoom />
      </Modal>
      <div>
        <p>List My owner room</p>
        {roomSelector && roomSelector.myRooms && (
          <div>
            {roomSelector.myRooms.map((item) => {
              return <div>{item.name}</div>
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Manager
