import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { keyStorage } from './const/keyStorage'
import { setIsAuthenticate, setUser } from './redux/reducers/user.reducer'
import { router } from './router'
import { decodeTokenFromLocalStorage, isValidToken } from './utils/jwtToken'
import { initialSocketAction } from './redux/actions/initialSocket'

const App = () => {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    const accessToken = localStorage.getItem(keyStorage.accessToken)
    if (!accessToken) {
      dispatch(setIsAuthenticate(false))
      return
    }
    const isValidUser = isValidToken(accessToken)
    if (isValidUser) {
      const userPayload = decodeTokenFromLocalStorage()
      if (!userPayload) {
        return
      }
      dispatch(setUser(userPayload))
      dispatch(initialSocketAction(userPayload))
      dispatch(setIsAuthenticate(true))
    }
  }, [])
  return <RouterProvider router={router} />
}

export default App
