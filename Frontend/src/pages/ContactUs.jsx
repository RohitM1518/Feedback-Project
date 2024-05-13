import React from 'react'
import {ContactForm} from '../components/index.js'

const ContactUs = () => {
  return (
    <div className='flex flex-col items-center mt-48'>
    <h1 className=' text-xl leading-tight md:text-[3rem] font-roboto -tracking-tight font-semibold text-center'>We are happy to hear from you!!!</h1>
    <h1 className=' text-lg mt-6 mb-3 text-center'>A simple email is all it takes to connect with me.</h1>
   
    <div className=''>
      <ContactForm />
    </div>
    </div>
  )
}

export default ContactUs