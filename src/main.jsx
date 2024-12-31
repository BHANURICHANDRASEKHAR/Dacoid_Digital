import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Context_Component from './Components/Context/Main.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
createRoot(document.getElementById('root')).render(
  <Context_Component><App /></Context_Component>,
)
