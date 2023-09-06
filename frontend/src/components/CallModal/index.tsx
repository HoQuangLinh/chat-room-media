import { FcEndCall } from 'react-icons/fc'
import Avatar from '../Avatar'
import Modal from '../Modal'

interface ICallModalProps {
  isOpen?: boolean
}
const CallModal = (props: ICallModalProps) => {
  const { isOpen } = props

  return (
    <Modal
      isOpen={isOpen}
      className='h-[500px] w-[400px] bg-[#00008b]'
      disableCloseClickOutside
    >
      <div className='flex h-full w-full flex-col items-center justify-center text-whiteCt'>
        <Avatar name={'Linh'} size='100' />
        <span className='py-2'>Linh</span>
        <div>From room Test12 is calling...</div>

        <div className='mt-20 cursor-pointer rounded-full border bg-[#EEEE] p-2'>
          <FcEndCall size={50} />
        </div>
      </div>
    </Modal>
  )
}

export default CallModal
