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
