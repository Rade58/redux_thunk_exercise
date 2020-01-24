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

  return dispatch => {
    
    // OVDE DAKLE JA PRAVIM API CALL

    fetch(apiURI)
    .then(response => response.json())
    .then(data => {

      // za sada cu samo zadati console logging
      // KASNIJE CU OVDE URADITI NESTO DRUGO

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

## SADA SE MOGU POZABAVITI DISPATCHING-OM, ALI PRE TOGA MORAM MODIFIKOVATI ACTION CEATOR, JER JOS NISAM DEFINISAO STA SE RADI SA DATOM; KOJE BIVA FETCHED

OPET KODIRAM U actions.js

- code src/actions.js

CILJ MI JE DAKLE DA SADA DEFINISEM DA THUNK, USTVARI RADI NESTO SA PODACIMA

ODNOSNO TREBA DA SE DEFINISE DISPATCHING, KOJI BI SE DOGODIO PRILIKOM POZIVA THUNK-A

```javascript
const ADD_ITEMS = "ADD_ITEMS"

export const fetchItems = () => {

  return dispatch => {

    fetch(apiURI)
    .then(response => response.json())
    .then(data => {

      const items = data.tweets   // OVO JE ZBOG EXTERNAL API, KOJI KORISTIM, ZNAS VEC ZASTO SAM PROMENIO IME

      // OVDE U dispatch ARGUMENT, ZA KOJI SMATRAM DA CE BITI FUNKCIJA
      // PROSLEDJUJEM NOVI POZIV KAO ARGUMENT
      dispatch(addItems({items}))

      // POZIVAM FUNKCIJU KOJU SAM DEKLARISAO DOLE

    })
  }

}

// DAKLE DEFNISAO SAM NOVU FUNKCIJU, KOJ USAM IZNAD UPOTREBIO
// OVA FUNKCIJA RETURN-UJE OBJEKAT SA ACTION TYPE-OM I PAYLOAD-OM

function addItems({items}){
  return {type: ADD_ITEMS, payload: {items}}
}
```

## SADA DA ISKORISTIM, ONAJ GORE PRIKAZANI 'ACTION CRATOR' fetchItems

NAIME, RANIJE SAM REKAO DA MI applyMiddleware, KOJI SAM ISKORISTIO, PRI KREIRANJU STORE-A KADA SAM MU PROSLEDIO REDUX THUNK, USTVARI OMOGUCAVA JEDNU STVAR:

**DA UMESTO ACTION OBJEKTA (KOJI IMA type I payload); JA USTVARI SMEM DA DISPATCH-UJEM FUNKCIJU, ODNOSNO THUNK, KOJI CE EVENTUALLY DISPATCH-OVATI, ACTION KOJI SAM ZADAO**

**ZATO OPET KORISTIM HIGH ORDER COMPONENT PRINCIP, KAKO BI DEFINISAO mapDispatchToProps, ALI OVOG PUTA JA DAKLE DEFINISEM POZIVANJE dispatch-A, SA ARGUMENTOM, KOJI NECE BITI OBJEKAT, VEC FUNKCIJA, CIJI JE PARAMETAR dispatch**

- code src/components/FetchItems.js

```javascript
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
  // DAKLE POZIVA SE, UVEZENI     fetchItems

  // A ON TREBA DA PROIZVEDE FUNKCIJU

  // FUNKCIJA JE DEFINISANA TAKO DA JOS SE PROSLEDJUJE dispatch


  return {
    fetchItems: () => dispatch(fetchItems())
  }
}


export default connect(null, mapDispatchToProps)(FetchItems)
```


## OSTAJE SAMO DA SE POZABAVIS REDUCER-OM

ALI NE VEZANO ZA TRENUTNU TEMU, UVEK OBRATI PAZNJU DA KADA HANDLE-UJES ACTION DA SVE LEPO WIRE-UJES, POGOTOVO KADA KORISTIS combineReducers, JER RANIJE SU TI SE PODKRADALE GRESKE, GDE SI DA UMESTO RETURN-UJES BRANCH OF STATE, TI USTVARI RETURN-OVAO CEO STATE U PARCIJALNOM REDUCER-U (odnosno obrati paznju da ne return-ujes pogresnu stvar pri handle-ovanju action-a, u `parcijalnom` reduceru, a da onda kada pozivas combineReducers **NE DEFINISES KAKO TREBA OBJEKAT KOJI ZADAJES KAO ARGUMENT *combineReducers* funkciji** (ODNOSNO DA IMAS DISKONTINUITET IZMEDJU TA DVA 'MESTA'))

- code src/reducers/index.js

```javascript
import {combineReducers} from 'redux'

const itemsReducer = (items = [], action) => {

  if(action.type === "ADD_ITEMS"){   // OBRATI PAZNJU I DA NE KORISTIS OVAKVE STRING LITERALSE NEGO DA REFERENCIRAS ACTIO NTYPE IZ NEKE VARIJABLE (TO SAM VEC RANIJE MNOGO PUTA GOVORIO)
    
    console.log({items: action.payload.items})

    return action.payload.items       // DAKLE OBRATI PAZNJU DA OVDE RETURNUJES SAMO items NIZ
  }


  return items
}

export default combineReducers(
  {items: itemsReducer}           // ZATO STO SI ZADAO DA TAJ REDUCER, VIDI RACUNA SAMO O items
)

```

## SADA DA ISPROBAS VE OVO MOZES DA PRI POKRETANJU REACT APP PROSLEDIS I ENVIROMENT VARIABLE

- REACT_APP_API_URI='url zadaj ovde' npm start

U BELESKAMA SAM OSTAVIO URL, KOJI MOZES DA ZADAS ZA OVAJ PROJEKAT

## MOGUCE JE DISPATCHING POZVATI I MULTIPLE TIMES

O OVOME JE GOVORIO AUTOR WORKSHOPA I SAMO JE U SVOM VIDEO-U POKAZAO KAKO TO IZGLEDA

ALI EVO JA SAM PRONSAO I NEKI MALO VECI PRIMER PA MOZES DA CHECK-UJES THAT OUT, NEKI PUT

<https://alligator.io/redux/redux-thunk/>

<https://www.youtube.com/watch?v=Sqkm39rqmEg>

NA PRIMER PRE I POSLE GETTINGA PODATKA MOGU SE DOSPATCHOVATI ACTIONS ZA

SET STATUS FOR LOADING ILI URADITI NESTO ON FAILIURE, U catch-OVOM CALLBACK-U

## ALI AUTOR WORKSHOPA NAPOMINJE DA REDUX THUNK NIJE SILVER BULLET I DA SE TREBA PAZLJIVO S NJIM

POGLEDAJ POSLEDNJU TRECINU 4.5 VIDEO-A, AKO TE ZANIAM STA JE HTEO DA KAZE

U SUSTINI NEKADA POSTOJE API-EVI, KOJI NISU BILI NAMENJENI ZA FRONTEND PRI NJIHOVOM KREIRANJU

PA SE ONDA DESI DA JE POTREBNO GETT-OVATI DATA FROM MULTIPLE TAKVIH API-EVA

PROBLEM JE I STA RADITI, AKO ZELIS DA TESTIRAS APP U KOJ ISI IMPLEMENTIRAO THUNK (DISPATCH-UJE SE FUNKCIJA KOJU NE MOZES CANCEL-OVATI) (ONO STA ON POKAZUJE DA BIH MOGAO URADITI NALAZI SE NA 118 STRANI SLAJDOVA (prikazao je odredjeni code, koji sluzi za testiranje) (potrebno je koristiti fetch mocking library sto bi bilo ))

SVE U SVEMU REDUX THUNK JE SIMPLE, AL ITAJ SIMPLISITY TE MOZE DOVESTI U NEZELJENE SITUACIJE

REDUX SAGA A TAKODJE I REDUX OBSERVABLE MOGU POMOCI
