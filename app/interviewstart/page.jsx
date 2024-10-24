"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import Interview from './interview';


function Interviewstart() {
  const {user}=useUser();
  return (
    <div className='p-10'>

        <Interview/>

    </div>
  )
}

export default Interviewstart