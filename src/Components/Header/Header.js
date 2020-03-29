import React from 'react'
import './Header.css'
import Logo from '../Logo/Logo'
import Score from '../Score/Score'

export default function Header(props) {
  return (
    <header className="header">
      <Logo />
      <Score score={props.score} />
    </header>
  )
}