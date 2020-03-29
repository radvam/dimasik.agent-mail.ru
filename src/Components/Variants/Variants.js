import React from 'react'
import './Variants.css'
import birdsData from '../BirdsInfo/birds'

export default function Variants(props) {

  const variants = birdsData[props.activeTabNum].map((arr, index) => {
    return (
      <div key={index} data-index={index} className="variant" onClick = {props.onClick}>
        <div className={props.classes[index]}></div> 
        <span>{arr.name}</span>
      </div>
    ) 
  })

  return (
    <div className="variants" onClick = {props.onTap}>
      {variants}
    </div>    
  )
}