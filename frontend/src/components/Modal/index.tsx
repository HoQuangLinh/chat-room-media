import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { CgClose } from 'react-icons/cg'
const modalElement = document.getElementById('modal-root')!
export interface IModalProps {
  isOpen?: boolean
  children: ReactNode
  className?: string
  disableCloseClickOutside?: boolean
}

export interface IModalHandles {
  openModal: () => void
  closeModal: () => void
}

const Modal = forwardRef<IModalHandles, IModalProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(props.isOpen)
  const closeModal = useCallback(() => {
    document.body.style.overflow = 'unset'
    setIsOpen(false)
  }, [])
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])
  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setIsOpen(true),
      closeModal
    }),
    [closeModal]
  )

  return createPortal(
    isOpen ? (
      <div
        onClick={() => {
          if (props.disableCloseClickOutside) {
            return
          }
          closeModal()
        }}
        className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#1e1f22db] transition-all'
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={`relative rounded-lg bg-blackBgCt p-4 text-center ${props.className}`}
        >
          <CgClose
            onClick={closeModal}
            className='absolute top-4 right-4 cursor-pointer text-2xl text-greyTextCt transition-all hover:text-[#dbdee1]'
          />
          {props.children}
        </div>
      </div>
    ) : null,
    modalElement
  )
})

export default Modal
