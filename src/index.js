import React from 'react'
import ReactDom from 'react-dom'
//
import {createStore} from 'redux'
import {Provider} from 'react-redux'
//
import reducer from './reducers/'
console.log(reducer.toString())
//

const root = document.getElementById('root')






ReactDom.render(
  <div>some text</div>,
  root
)