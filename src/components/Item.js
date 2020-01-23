import React from 'react'

export default ({item}) => {

  return (
  <article>
    <header>
      <h3>{item.user.name} wrote:</h3>
    </header>
    <p>{item.text}</p>
  </article>
  )
}