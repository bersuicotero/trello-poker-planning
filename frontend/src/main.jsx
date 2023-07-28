import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import State from './context/State.jsx'

createRoot(document.getElementById('root')).render(
  <State>
    <App />
  </State>
)
