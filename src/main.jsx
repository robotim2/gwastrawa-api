import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import ThemeProvider from './utils/ThemeContext';
import {ContextProvider} from './utils/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <ContextProvider>
          <ThemeProvider>
              <RouterProvider router={router} />
          </ThemeProvider>
        </ContextProvider>
  </React.StrictMode>,
)
