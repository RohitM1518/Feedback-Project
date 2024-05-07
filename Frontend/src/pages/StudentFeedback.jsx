import React from 'react'
import { FeedbackForm } from '../components/index.js'
const StudentFeedback = () => {
  return (
    <div className=' flex justify-center items-center mt-20'>
        <FeedbackForm type={`Student`}/>
    </div>
  )
}

export default StudentFeedback