import { ReactElement, useState } from 'react'
import { Navigate } from 'react-router-dom'
interface IAuthenticatorRouteProps {
  children: ReactElement
}
const AuthenticatorRoute: React.FC<IAuthenticatorRouteProps> = (props) => {
  const { children } = props
  const [isAuthenticated] = useState(true)

  return isAuthenticated ? <Navigate to={'/'} /> : children
}
export default AuthenticatorRoute
