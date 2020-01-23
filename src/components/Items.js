import React from 'react'
import Item from './Item'
// uvozim
import {connect} from 'react-redux'
//

const Items = ({items = []}) => {
  return (
  <section>
    {items.map(item => <Item key={item.id} item={item} />)}
  </section>
  )
}

// OVO ZAMENJUJEM
// export default Items

// OVIM
export default connect(
  ({items}) => ({items})
)(Items)