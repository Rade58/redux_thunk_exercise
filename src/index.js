import React from 'react'
import ReactDom from 'react-dom'

// UZIMAM   applyMiddleware     I       thunk
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
//

import {Provider} from 'react-redux'

import reducer from './reducers/'

import FetchItems from './components/FetchItems'
import Items from './components/Items'


const root = document.getElementById('root')

// PRI KREIRANJU STORE, SADA ZADAJEM I MIDDLEWARE, A TO CE BITI POMENUTI thunk
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
//


const App = () => {
  return (
  <div className="App">
    <h2>Items Stream</h2>
    <FetchItems />
    <Items />
  </div>
  )
}


ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)