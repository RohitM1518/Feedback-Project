import './App.css'
import { Footer, AppAppBar } from './components/index.js'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'


function App() {
  const dispatch = useDispatch()
  const refreshToken = useSelector(state => state.currentUser?.user?.refreshToken)
  const accessToken = useSelector(state => state.currentUser?.accessToken)
  if (refreshToken && accessToken) {
    ; (async () => {
      const res = await axios.post('http://localhost:8000/user/refresh-token',
        { refreshToken: refreshToken },
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

    })();
  }
  return (
    <div className=' flex flex-col gap-20'>
      <AppAppBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
