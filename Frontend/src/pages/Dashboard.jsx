import React, { useEffect } from 'react'

const Dashboard = () => {
  const accessToken = useSelector(state => state.currentUser?.accessToken)
  
  useEffect(()=>{
  const getAllFeedbacks=async() => {
    try {
      
        const res = await axios.get('http://localhost:8000/feedback/getallfeedbacks',
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
  
    } catch (error) {
      dispatch(logout())
       throw error
    }
    };
    getAllFeedbacks()
  })
  return (
    <div className=' mt-28 flex justify-center items-center'>

    </div>
  )
}

export default Dashboard


