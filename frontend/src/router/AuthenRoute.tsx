import { Navigate } from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'
import { ReactElement, useState } from 'react'
interface IAuthenticatorRouteProps {
  children: ReactElement
}
const AuthenticatorRoute: React.FC<IAuthenticatorRouteProps> = (props) => {
  const { children } = props
  const [isAuthenticated,]=useState(false)
  
  return  isAuthenticated?<Navigate to={'/'}/>: children 
}
export default AuthenticatorRoute
