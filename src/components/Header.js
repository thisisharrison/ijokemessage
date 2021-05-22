import React from 'react'

// Renders Dad and Profile Image
// Drop down to click Favorites
const Header = (props = {}) => {
  const name = props.name ? props.name : 'Dad'
  const img = props.img ? <img src={props.img} alt="dad-profile" /> : '👨'
  return (
    <div className="header">
      {img} {name}
    </div>
  )
}

export default Header
