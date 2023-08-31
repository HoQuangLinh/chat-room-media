import { ReactElement, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useRootSelector } from '@/redux/reducers'

interface IPrivateRouteProps {
  children: ReactElement
}
const PrivateRoute = (props: IPrivateRouteProps) => {
  const user = useRootSelector((item) => item.user)
  const { children } = props
  if (!user || !user.isAuthenticated) {
    return <Navigate to={'/login'} />
  }

  return children
}

export default PrivateRoute
