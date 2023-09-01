import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { keyStorage } from './const/keyStorage'
import { setIsAuthenticate } from './redux/reducers/user.reducer'
import { router } from './router'
import { isValidToken } from './utils/jwtToken'

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
      dispatch(setIsAuthenticate(true))
    }
  }, [])
  return <RouterProvider router={router} />
}

export default App
