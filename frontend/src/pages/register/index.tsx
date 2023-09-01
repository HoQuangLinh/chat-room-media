import Input from '@/components/Input'
import { IFormRegister } from '@/interfaces/form/auth/Auth'
import { useForm } from 'react-hook-form'

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues
  } = useForm<IFormRegister>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form onSubmit={onSubmit} className='w-[480px] rounded-[5px] bg-greyCt p-8'>
      <h2 className='text-center text-2xl font-semibold text-whiteCt'>
        ZOOM BEE
      </h2>
      <Input
        name='username'
        control={control}
        type='text'
        label='Username'
        rules={{
          required: 'Username is required'
        }}
        error={errors.username?.message}
      />
      <Input
        name='password'
        control={control}
        type='password'
        label='Password'
        rules={{
          required: 'Password is required'
        }}
        error={errors.password?.message}
      />
      <Input
        name='confirmPassword'
        control={control}
        type='text'
        label='Confirm Password'
        rules={{
          required: 'Confirm Password is required',
          validate: (value) => {
            if (value !== getValues('password')) {
              return 'Password not match'
            }
          }
        }}
        error={errors.confirmPassword?.message}
      />

      <button
        type='submit'
        className='mt-4 w-full cursor-pointer rounded-[3px] bg-primary py-3 px-3 font-medium text-whiteCt transition-all hover:tracking-[2px]'
      >
        Register
      </button>
    </form>
  )
}

export default Register
