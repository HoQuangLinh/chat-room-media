import HomeLayout from '@/layout/HomeLayout'
import Home from '@/pages/home'
import Login from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import Register from '../pages/register'
import AuthenticatorRoute from './AuthenticatorRoute'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <HomeLayout></HomeLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/',
    element: (
      <AuthenticatorRoute>
        <AuthLayout></AuthLayout>
      </AuthenticatorRoute>
    ),
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])
