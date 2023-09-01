import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IFormCreateRoom } from '../../interfaces/form/room/Room'
import Input from '../Input'

const NewRoom = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormCreateRoom>()

  const onSubmit = handleSubmit(async (data) => {})
  const [activeTab, setActiveTab] = useState(0)

  return (
    <form onSubmit={onSubmit} className='flex h-full w-full flex-col'>
      <div className='pb-4 text-[22px] font-semibold text-whiteCt'>
        New room
      </div>
      {activeTab === 0 && (
        <div>
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
            onClick={() => {
              setActiveTab(1)
            }}
            type='button'
            value='Next'
            className='mt-4 w-full cursor-pointer rounded-[3px] bg-primary py-3 px-3 font-medium text-whiteCt '
          />
        </div>
      )}
      {activeTab === 1 && (
        <div className='flex h-full w-full flex-col'>
          <div className='flex-1 overflow-auto'>
            <Input
              label='List users in zoom bee'
              type='multiselect'
              name='members'
              control={control}
              options={[
                { label: 'Category 1', value: 'category1' },
                { label: 'Category 2', value: 'category2' },
                { label: 'Category 3', value: 'category3' },
                { label: 'Category 4', value: 'category4' },
                { label: 'Category 5', value: 'category5' },
                { label: 'Category 6', value: 'category6' }
              ]}
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
