import React from 'react'
import './BirdImage.css'

export default function BirdImage(props) {
  return <img src={props.src} className='bird_image' alt='bird' />
}