import {combineReducers} from 'redux'

const itemsReducer = (items = [], action) => {
  return items
}

export default combineReducers(
  {items: itemsReducer}
)
