import React from 'react'

export default function Heading_text(props) {
 
  return (
    <div>
        <h1 className={`${props.boldness} ${props.family} ${props.color} ${props.size} ${props.decoration} ${props.className}`}>{props.text}</h1>
    </div>
  )
}
