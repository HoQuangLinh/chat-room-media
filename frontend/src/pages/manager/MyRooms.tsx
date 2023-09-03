import Avatar from '@/components/Avatar'
import { useRootSelector } from '@/redux/reducers'
import { formatDate } from '@/utils/date'
import { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { HiLockClosed } from 'react-icons/hi'
import { RiEarthFill } from 'react-icons/ri'

const MyRooms = () => {
  const roomSelector = useRootSelector((item) => item.room)
  const [isCollapsed, setIsCollapsed] = useState<number>(-1)

  const toggleCollapse = (index: number) => {
    setIsCollapsed(index)
  }

  return (
    <>
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
                <div
                  onClick={() =>
                    isCollapsed === index
                      ? toggleCollapse(-1)
                      : toggleCollapse(index)
                  }
                  className='ml-auto flex cursor-pointer items-center rounded-xl bg-[#5d5d5d6e] py-1 px-2 text-[#9eadc7] transition-all hover:bg-[#5d5d5d99]'
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
    </>
  )
}

export default MyRooms
