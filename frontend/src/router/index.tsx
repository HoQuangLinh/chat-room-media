import HomeLayout from '@/layout/HomeLayout'
import Home from '@/pages/home'
import Login from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'
import { path } from '../const/path'
import AuthLayout from '../layout/AuthLayout'
import MyFiles from '../pages/myfiles'
import Register from '../pages/register'
import Rooms from '../pages/rooms'
import AuthenticatorRoute from './AuthenticatorRoute'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: path.home,
    element: (
      <PrivateRoute>
        <HomeLayout></HomeLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: path.rooms,
        element: <Rooms />
      },
      {
        path: path.files,
        element: <MyFiles />
      }
    ]
  },
  {
    path: path.home,
    element: (
      <AuthenticatorRoute>
        <AuthLayout></AuthLayout>
      </AuthenticatorRoute>
    ),
    children: [
      {
        path: path.login,
        element: <Login />
      },
      {
        path: path.register,
        element: <Register />
      }
    ]
  }
])
