import { Suspense } from 'react'
import { BiLoader } from 'react-icons/bi'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <Suspense fallback={<BiLoader />}>
      <div className='fixed top-0 flex h-full w-full bg-blackCt items-center justify-center'>
        <Outlet />
      </div>
    </Suspense>
  )
}

export default AuthLayout
