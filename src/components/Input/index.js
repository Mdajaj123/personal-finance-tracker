import React from 'react'
import './style.css'
const Input = ({label,state,setState,placeholder,type}) => {
  return (
    <div className='input-wrapper'>
          <p className='label-input'>{label}</p>
          <input type={type} value={state} onChange={(e) => setState(e.target.value)} className='custom-input' placeholder={placeholder } />
    </div>
  )
}

export default Input
