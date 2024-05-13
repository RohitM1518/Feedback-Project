import React from 'react'
import { FeedbackForm } from '../components/index.js'
const ProductFeedback = () => {
  return (
    <div className=' flex justify-center items-center mt-32'>
        <FeedbackForm type={`Product`}/>
    </div>
  )
}

export default ProductFeedback