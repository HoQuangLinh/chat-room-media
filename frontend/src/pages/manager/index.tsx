import { useRef } from 'react'
import Modal, { TModalHandles } from '@/components/Modal'
import NewRoom from '../../components/NewRoom'

const Manager = () => {
  const modalRef = useRef<TModalHandles>(null)
  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between px-12 pt-4'>
        <button onClick={() => modalRef.current?.openModal()}>New room</button>
      </div>
      <Modal ref={modalRef} className='h-[500px] w-[500px]'>
        <NewRoom />
      </Modal>
    </div>
  )
}

export default Manager
