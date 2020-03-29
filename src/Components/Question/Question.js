import React from 'react'
import './Question.css'
import BirdImage from '../BirdImage/BirdImage'
import Player from '../Player/Player'

export default function Question(props) {
  return (
    <div className="question">
      <BirdImage src={props.image} />
      <div style={{display: 'flex', flex: 'auto'}}>
        <h2 style={{textAlign: 'center'}}>{props.name}</h2>
        <Player src={props.audio} toplay={props.toplay} /> 
      </div>      
    </div>
  )
}