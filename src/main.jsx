import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import 'react-toastify/dist/ReactToastify.css'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(registration => {
    console.log('Service Worker registered with scope: ', registration.scope)
  }).catch(error => {
    console.log('Service Worker registration failed: ', error)
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
