import React from 'react'
import Item from './Item'
// uvozim
import {connect} from 'react-redux'
//

const Items = ({items = []}) => {

  console.log(items)
  console.log(items.map)

  return (
  <section>
    {items.map(item => <Item key={item.id} item={item} />)}
  </section>
  )
}

const mapStateToProps = (state, ownProps) => {

  console.log(state)

  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(Items)