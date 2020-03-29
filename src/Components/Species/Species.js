import React from 'react'
import './Species.css'

const speciesArr = [
  'Разминка',
  'Воробьиные',
  'Лесные птицы',
  'Певчие птицы',
  'Хищные птицы',
  'Морские птицы'
]

export default function Species(props) {
  const species = speciesArr.map((name, index) => {
    return (
      <li key={index} className={'species_item' + (props.activeTabNum === index ? ' active' : ' passive')}>
        <span>{name}</span>
      </li>
    )
  })

  return (
    <ul className='species'>
      {species}
    </ul>
  )
}

