import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, AdminSignIn,AdminSignUp,UserSignIn,UserSignUp,ProductFeedback,Dashboard, StudentFeedback, EmployeeFeedback,ContactUs } from './pages/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/usersignin',
      element: <UserSignIn />
    },
    {
      path: '/usersignup',
      element: <UserSignUp />
    },
    {
      path: '/adminsignup',
      element: <AdminSignUp />
    },
    {
      path: '/adminsignin',
      element: <AdminSignIn />
    },
    {
      path: '/productfeedback',
      element: <ProductFeedback />
    },
    {
      path: '/studentfeedback',
      element: <StudentFeedback />
    },
    {
      path: '/employeefeedback',
      element: <EmployeeFeedback />
    },
    {
      path: '/contactus',
      element: <ContactUs />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
