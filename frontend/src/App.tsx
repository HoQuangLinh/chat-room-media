import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useEffect } from 'react'
import { isValidToken } from './utils/jwtToken'
import { keyStorage } from './const/keyStorage'
import { useDispatch } from 'react-redux'
import { setIsAuthenticate } from './redux/reducers/user.reducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const accessToken = localStorage.getItem(keyStorage.accessToken)
    if (!accessToken) {
      dispatch(setIsAuthenticate(false))
      return
    }
    const isValidUser = isValidToken(accessToken)
    if (isValidUser) {
      dispatch(setIsAuthenticate(true))
    }
  }, [])
  return <RouterProvider router={router} />
}

export default App
