import React from 'react'
import '../styles/join.css'

export default function Join() {
  return (
    <div className='joinContainer'>
        <div className='joinGroup'>Join Group</div>
        <div className='inputCode'><input type="text" placeholder="Enter Group Code"/></div>
        <button className='joinBtn' type='submit'>Join</button>
    </div>
  )
}
