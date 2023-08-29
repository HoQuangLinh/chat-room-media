import Header from '@/components/header'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'

let scroll = 0
const HomeLayout = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' })
    }, 100)
  }, [])

  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset
      return scroll
    }
  })

  return (
    <div>
      <Header />
      <div>
        <div>
          <Sidebar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
