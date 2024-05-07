import React from 'react'
import { Button } from './index'
const ContactForm = () => {
    return (
        <div className='flex h-full w- items-center'>
            <form action="">
                {/* <input type="text" name="email" id=""  className=' w-full border border-black rounded Full h-10'/>
        <Button className=' pl-5 pr-5'>Mail</Button> */}
                <Button className='flex gap-2'> <h1>
                    <a href="mailto:rmugalkhod.cse@gmail.com" >EchoConnect</a>
                </h1>
                </Button>

            </form>
        </div>
    )
}

export default ContactForm