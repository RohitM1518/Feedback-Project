import React from 'react'
import { FeedbackForm } from '../components/index.js'
const EmployeeFeedback = () => {
    
  return (
    <div className=' flex justify-center items-center mt-32'>
        <FeedbackForm type={`Employee`}/>
    </div>
  )
}

export default EmployeeFeedback