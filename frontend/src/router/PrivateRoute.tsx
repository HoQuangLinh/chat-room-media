import { ReactElement, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface IPrivateRouteProps {
  children: ReactElement
}
const PrivateRoute = (props: IPrivateRouteProps) => {
  const [isLogin, setIsLogin] = useState(false)
  const { children } = props
  if (!isLogin) {
    return <Navigate to={'/login'} />
  }

  return children
}

export default PrivateRoute
