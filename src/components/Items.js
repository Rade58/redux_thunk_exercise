import React from 'react'
import Item from './Item'

export default ({items = []}) => {
  return (
  <section>
    {items.map(item => <Item key={item.id} item={item} />)}
  </section>
  )
}