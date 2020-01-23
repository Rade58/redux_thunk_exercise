import React from 'react'

// UVEZI I REACT-REDUX-OV connect, ALI I 'ACTION CREATOR'-A, KOJEG SI KREIRAO
import {connect} from 'react-redux'
import {fetchItems} from '../actions'
//


const FetchItems = ({fetchItems}) => {
  return (
  <button onClick={fetchItems}>Fetch Items</button>
  )
}

// OVO VISE NIJE DEFAULT KOJI IZVOZIS
// export default FetchItems

// VEC OVO

const mapDispatchToProps = (dispatch, ownProps) => {
  return fetchItems()()
}
