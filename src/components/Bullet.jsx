import React from 'react'
import UserProfile from '/user-circle-solid.svg'
import Robot from '/black.svg'
import '../styles/bullet.css'

function Bullet ({role, content}) {
  const direction = role == "bot" ? 'left' : 'right'
  console.log({role, content})
  return (
    <div className={`bullet $direction`}>
      <div className='img'>
        <img src={role == "bot"?Robot : UserProfile} alt="couldn't load image" height={30} />
      </div>
      <div className={role}>
        <p className='text'>{content}</p>
      </div>
    </div>
  )
}

export default Bullet
