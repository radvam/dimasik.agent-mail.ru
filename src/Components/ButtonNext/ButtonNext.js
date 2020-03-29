import React from 'react'
import './ButtonNext.css'

export default function ButtonNext(props) {
  return <button 
            className={'button' + (props.active ? ' button-active' : ' button-passive')}
            onClick={props.onClick}
          >{props.name}</button>
}