import React from 'react'
import ReactDom from 'react-dom'
//
import {createStore} from 'redux'
import {Provider} from 'react-redux'
//
import reducer from './reducers/'
//
import FetchItems from './components/FetchItems'
import Items from './components/Items'
//

const root = document.getElementById('root')

const store = createStore(reducer)


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