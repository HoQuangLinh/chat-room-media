import Modal, { TModalHandles } from '@/components/Modal'
import { useRef } from 'react'
import { IoIosAdd } from 'react-icons/io'
import NewRoom from '../../components/NewRoom'
import MyRooms from './MyRooms'

const Manager = () => {
  const modalRef = useRef<TModalHandles>(null)
  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between pb-3'>
        <button
          onClick={() => modalRef.current?.openModal()}
          className='flex cursor-pointer items-center rounded-[3px] bg-primary py-2 px-3 font-medium text-whiteCt transition-all hover:opacity-95'
        >
          <IoIosAdd className='mr-1 text-whiteCt' />
          New room
        </button>
      </div>
      <Modal ref={modalRef} className='h-[500px] w-[500px]'>
        <NewRoom
          onCloseModal={() => {
            modalRef.current?.closeModal()
          }}
        />
      </Modal>
      <div>
        <div className='text-md mt-4 mb-2 flex justify-between font-bold uppercase'>
          <label className='text-greyLabelCt'>List My owner room</label>
        </div>
        <MyRooms />
      </div>
    </div>
  )
}

export default Manager
