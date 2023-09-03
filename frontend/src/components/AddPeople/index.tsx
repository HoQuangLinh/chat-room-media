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

interface INewRoomProps {
  onCloseModal: () => void
}
const AddPeople = (props: INewRoomProps) => {
  const { onCloseModal } = props
  const { handleSubmit, control, setValue } = useForm<IFormCreateRoom>({
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
  useEffect(() => {
    userService.getAllUser().then((data) => {
      setUsers(data)
    })
  }, [])

  return (
    <form onSubmit={onSubmit} className='flex h-full w-full flex-col'>
      <div className='flex items-center justify-center pb-4 text-[22px] font-semibold text-whiteCt'>
        Add people
      </div>
      <div className='flex h-full w-full flex-col'>
        <div className='flex-1'>
          <Input
            label='New people join into room'
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
          value='Add people'
          className='mt-4 w-full cursor-pointer rounded-[3px] bg-primary py-3 px-3 font-medium text-whiteCt '
        />
      </div>
    </form>
  )
}

export default AddPeople
