# redux thunk implementation

OVDE CU DATI OBJASNJENJE KAKO SAM IMPLEMENTIRAO REDUX THUNK, A TI POGLEDAJ FAJLOVE

## :one: IMPORTING applyMiddleware FROM 'redux' AND IMPORTING DEFULT OF 'redux-thunk'

## :two: USING applyMiddleware(thunk) AS SECOND ARGUMENT OF createStore

`src/index.js`

```javascript
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
```

## SADA TREBAM DA KREIRAM 'ACTION CREATOR' (BIG AIR QUOTES), KOJI CE DA RETURN-UJE FUNCTION, KOJA CE EVENTUALLY DISPATCH-OVATI ACTION

REDUX NECE DA IMA BILO STA SA STVOJIM ASYNC-OM, I ZELI DA OSTANE  `WORLD OF PURE FUNCTIONS`

DAKLE SVE ASYNC STVARI TREBA DA BUDU ISOLATED U MIDDLEWARE

**ASYNC STVARI NE TREBA DA E DOGADJAJU U REDUCERU**

**ASYNC STVARI NE TREBA DA SE DESAVAJU NI U mapDispatchToProps**

ili bil ocemu along those lines

## :three: KREIRAM `src/actions.js`, A U NJEMU KREIRAM POMENUTI `ACTION CREATOR`

- touch src/actions.js

- code src/actions.js

```javascript
// DAKLE EXPORT-UJEM FUNKCIJU, KOJA CE SE ZVATI fetchItems

// i ona treba da return-uje funkciju  KOJOJ        dispatch      TREBA DA BUDE PARAMETAR

// MEDJUTIM OBEZBEDI URI OVDE 
// REKAO SAM DA ZELIM DA KORISTI ENVIROMENT VARIABLE, KAKO BIH GA PROSLEDIO

const apiURI = process.env.REACT_APP_API_URI       // JA CU TAKO ZADAVATI IME VARIJABLI PRI POKRETANJU `npm start`


export const fetchItems = () => {

  dispatch => {
    
    // OVDE DAKLE JA PRAVIM API CALL

    fetch(apiURI)
    .then(response => response.json())
    .then(data => {

      // za sada cu samo zadati console logging

      console.log({data, dispatch})
    })
  }

}
```

## :FOUR: SADA MOZES DA REWRITE-UJES Items.js UZ POMOC connect-A. ODNOSNO DA ISKORISTISH HIGHR ORDER

NARAVNO, JOS NISI SASVIM DEFINISAO DISPATCHING, ALI OVO DA URADIS SADA

- code src/components/Items.js

```javascript
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
```

## SADA SE MOGU POZABAVITI DISPATCHING-OM 

SADA NE MORAS DA KORISTIS NIKAKV NOVI CONTAINER (POSTO JE REC O SIMPLE PROJECT-U), SAMO TREBA DA REDEFINISES FetchItem KOMPONENTU

TREBA DA ISKORISTIS `connect`, KAKO BI JOJ ZADAO mapDispatchToProps, STVARAJUCI NA TAKAV NACIN CONTAINER, SAMO TREBAS DA UMESTO FetchItems REACT KOMPONENTE, IZVEZES KOMPONENTU, KOJA JE NASTAL UPOTREBOM connect-A, JER JE FetchItems VEC UPOTREBLJEN U APPLICATION KOMPONENTI

- code src/components/FetchItems.js

```javascript

```
