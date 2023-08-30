import Input from '@/components/input'
import { IFormLogin } from '@/interfaces/Form'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormLogin>()
  
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
        rules={{
          required: 'Password is required'
        }}
        label='Password'
        error={errors.password?.message}
      />

      <button
        type='submit'
        className='mt-4 w-full cursor-pointer rounded-[3px] bg-primary py-3 px-3 font-medium text-whiteCt transition-all hover:tracking-[2px]'
      >
        Login
      </button>
      <div className='mt-3 block text-center text-sm font-medium text-greyTextCt'>
        Need an account?
        <Link
          to={'/Register'}
          className='ml-1 cursor-pointer text-[#00a8fc] hover:text-[#2eb9ff]'
        >
          Register
        </Link>
      </div>
    </form>
  )
}

export default Login
