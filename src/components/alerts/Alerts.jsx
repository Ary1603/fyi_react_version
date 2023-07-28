import React from 'react'
import '../../assets/styles/errors.css'
function Alerts({message}) {
  return (
    <div className='error-message'>{message}</div>
  )
}

export default Alerts