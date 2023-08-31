import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { IFormCreateRoom } from '../../interfaces/room/Room'
import Input from '../Input'

const NewRoom = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormCreateRoom>()

  const onSubmit = handleSubmit(async (data) => {})

  return (
    <form onSubmit={onSubmit} className='flex h-full w-full flex-col'>
      <div className='pb-4 text-[22px] font-semibold text-whiteCt'>
        New room
      </div>
      <div className='flex-1 overflow-auto'>
        <Input
          label='Room name'
          type='text'
          name='name'
          control={control}
          placeholder='Room name'
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
        type='submit'
        value='Create room'
        className='mt-4 w-full cursor-pointer rounded-[3px] bg-primary py-3 px-3 font-medium text-whiteCt '
      />
    </form>
  )
}

export default NewRoom
