import React, { useCallback, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { CgClose } from 'react-icons/cg'
const modalElement = document.getElementById('modal-root')!
export type TModalProps = {
  children: React.ReactNode
  className?: string
}

export type TModalHandles = {
  openModal: () => void
  closeModal: () => void
}

const Modal = React.forwardRef<TModalHandles, TModalProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = useCallback(() => {
    setIsOpen(false)
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
        onClick={closeModal}
        className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-[#1e1f22db] transition-all'
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
