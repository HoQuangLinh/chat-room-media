import { IUserResponse } from '@/interfaces/api/User'
import { IFormCreateRoom } from '@/interfaces/form/room/Room'
import { useRootSelector } from '@/redux/reducers'
import { createRoom } from '@/redux/reducers/room.reducer'
import { roomService } from '@/services/room.service'
import userService from '@/services/user.service'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Input from '../Input'
import { getValue } from '@testing-library/user-event/dist/utils'

interface INewRoomProps {
  onCloseModal: () => void
}
const NewRoom = (props: INewRoomProps) => {
  const { onCloseModal } = props
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<IFormCreateRoom>({
    defaultValues: {
      members: [],
      visibility: 'public'
    }
  })
  const [users, setUsers] = useState<IUserResponse[]>([])
  const userSelector = useRootSelector((item) => item.user)
  const dispatch = useDispatch()

  const onSubmit = handleSubmit((data) => {
    const formCreateRoom = data
    if (userSelector?.userId) {
      formCreateRoom.members = [userSelector.userId, ...formCreateRoom.members]
    }

    roomService.createRoom(formCreateRoom).then((data) => {
      dispatch(createRoom(data))
      onCloseModal && onCloseModal()
    })
  })
  const [activeTab, setActiveTab] = useState(0)
  useEffect(() => {
    userService.getAllUser().then((data) => {
      setUsers(data.filter((item) => item._id !== userSelector?.userId))
    })
  }, [])

  return (
    <form onSubmit={onSubmit} className='flex h-full w-full flex-col'>
      <div className='pb-4 text-[22px] font-semibold text-whiteCt'>
        New room
      </div>
      {activeTab === 0 && (
        <div className='flex h-full w-full flex-col'>
          <div className='flex-1 overflow-auto'>
            <Input
              label='Room name'
              type='text'
              name='name'
              control={control}
              placeholder='Room name'
              rules={{
                required: 'Room name is required'
              }}
              error={errors?.name?.message}
            />
            <Input
              name='visibility'
              control={control}
              type='radio'
              label='Visibility'
              error={errors.visibility?.message}
              options={[
                { value: 'public', label: 'Public' },
                { value: 'private', label: 'Private' }
              ]}
            />
          </div>
          <input
            onClick={() => {
              if (!getValues('name') || getValues('name').trim().length === 0) {
                setError('name', {
                  message: 'Room name is required',
                  type: 'required'
                })
              } else {
                setActiveTab(1)
              }
            }}
            type='button'
            value='Next'
            className='mt-4 w-full cursor-pointer rounded-[3px] bg-primary py-3 px-3 font-medium text-whiteCt '
          />
        </div>
      )}
      {activeTab === 1 && (
        <div className='flex h-full w-full flex-col'>
          <div className='flex-1'>
            <Input
              label='List users in zoom bee'
              type='multiselect'
              name='members'
              control={control}
              onSelect={(options) => {
                const selectedValues =
                  options && options.map((item) => item.value)
                setValue('members', selectedValues)
              }}
              options={users.map((item) => {
                return {
                  label: item.username,
                  value: item._id
                }
              })}
            />
          </div>
          <input
            type='submit'
            value='Create'
            className='mt-4 w-full cursor-pointer rounded-[3px] bg-primary py-3 px-3 font-medium text-whiteCt '
          />
        </div>
      )}
    </form>
  )
}

export default NewRoom
