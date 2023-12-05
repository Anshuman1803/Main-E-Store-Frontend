import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function FormContainer() {
  return (
    <div className='formContainer'>
     <Outlet/>
      <Link to={"/"} className='gotoHomeLink'>Go Home</Link>
    </div>
  )
}

export default FormContainer
