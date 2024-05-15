import './App.css'
import { Footer, AppAppBar } from './components/index.js'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './redux/userSlice.js';


function App() {
  const dispatch = useDispatch()
  const refreshToken = useSelector(state => state.currentUser?.user?.refreshToken)
  const accessToken = useSelector(state => state.currentUser?.accessToken)
  
  const refreshTheToken=async() => {
    try {
      
        const res = await axios.post('http://localhost:8000/user/refresh-token',
          { refreshToken: refreshToken },
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        dispatch(login(res.data.data.data))
  
    } catch (error) {
      dispatch(logout())
       throw error
    }
    
    refreshTheToken();
  }
  
  return (
    <div className=' flex flex-col'>
      <AppAppBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
