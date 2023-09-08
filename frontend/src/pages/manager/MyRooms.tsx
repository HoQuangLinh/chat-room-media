import Avatar from '@/components/Avatar'
import { useRootSelector } from '@/redux/reducers'
import { formatDate } from '@/utils/date'
import { useRef, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { HiLockClosed } from 'react-icons/hi'
import { RiEarthFill } from 'react-icons/ri'
import { FaUserPlus } from 'react-icons/fa'
import Modal, { IModalHandles } from '@/components/Modal'
import AddPeople from '@/components/AddPeople'
import { IRoom } from '@/interfaces/base/Room'

const MyRooms = () => {
  const roomSelector = useRootSelector((item) => item.room)
  const [isCollapsed, setIsCollapsed] = useState<number>(-1)
  const [selectedRoomId, setSelectedRoomId] = useState<string>('')
  const [selectedRoom, setSelectedRoom] = useState<IRoom>()
  const modalRef = useRef<IModalHandles>(null)
  const toggleCollapse = (index: number) => {
    setIsCollapsed(index)
  }

  return (
    <div className='flex-1'>
      <div className='scroll-ruler h-full'>
        {roomSelector &&
          roomSelector?.myOwnerRooms.map((item, index) => {
            return (
              <div className='mt-2 flex flex-col rounded-md bg-[#1a1918] p-2'>
                <div className=' flex items-center'>
                  <div className='text-[#949ba4]'>
                    {item.visibility === 'public' ? (
                      <RiEarthFill />
                    ) : (
                      <HiLockClosed />
                    )}
                  </div>
                  <div className='ml-2 flex flex-col text-whiteCt'>
                    {item.name}
                    <span className='text-xs text-[#949ba4]'>
                      {item.createdAt && formatDate(item.createdAt)}
                    </span>
                  </div>
                  <div className='ml-auto flex items-center'>
                    <div
                      className='flex cursor-pointer items-center rounded-xl bg-[#9eadc7] py-1 px-2 transition-all hover:bg-[#9eadc7e0]'
                      onClick={() => {
                        setSelectedRoomId(item._id)
                        setSelectedRoom(item)
                        modalRef.current?.openModal()
                      }}
                    >
                      <FaUserPlus className='mr-1' />
                      Invite
                    </div>
                    <div
                      onClick={() =>
                        isCollapsed === index
                          ? toggleCollapse(-1)
                          : toggleCollapse(index)
                      }
                      className='ml-2 flex cursor-pointer items-center rounded-xl bg-[#5d5d5d6e] py-1 px-2 text-[#9eadc7] transition-all hover:bg-[#5d5d5d99]'
                    >
                      {item.members && item.members.length}
                      {item.members &&
                        (item.members.length > 1 ? ' members' : ' member')}
                      {isCollapsed === index ? (
                        <BiChevronUp className='ml-1' />
                      ) : (
                        <BiChevronDown className='ml-1' />
                      )}
                    </div>
                  </div>
                </div>
                {isCollapsed === index && (
                  <div className='my-1 flex flex-col px-6 transition-all'>
                    {item.members?.map((member) => (
                      <div className='mt-2 flex items-center'>
                        <Avatar name={member.username} size='28' />
                        <span className='ml-1 text-[#949ba4]'>
                          {member.username}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        <Modal ref={modalRef} className='h-[80%] w-[500px]'>
          <AddPeople
            selectedRoom={selectedRoom!}
            selectedRoomId={selectedRoomId}
            onCloseModal={() => {
              modalRef.current?.closeModal()
            }}
          />
        </Modal>
      </div>
    </div>
  )
}

export default MyRooms
