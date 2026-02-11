import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthOrApp from "./main/authOrapp.jsx"
import App from "./main/App.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
