import { ReactElement, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useRootSelector } from '../redux/reducers'
interface IAuthenticatorRouteProps {
  children: ReactElement
}
const AuthenticatorRoute: React.FC<IAuthenticatorRouteProps> = (props) => {
  const { children } = props
  const user = useRootSelector((item) => item.user)

  return user && user.isAuthenticated ? <Navigate to={'/'} /> : children
}
export default AuthenticatorRoute
