import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx' // imports main component of the application

// <StrictMode> enables additional checks and warnings for the application
// <App /> renders the main component of the application
createRoot(document.getElementById('root')!).render( // tells React where to render the application in the HTML file
  <StrictMode>
    <App /> 
  </StrictMode>,
)
