import App from '@/App'
import ReactDOM from 'react-dom/client'
import './index.css'
import Stores from './redux/stores'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Stores>
    <App />
  </Stores>
)
