const apiURI = process.env.REACT_APP_API_URI       
// const apiURI = "http://tweet-stream.glitch.me/api/tweets" 

// ZADAJEM NOVI ACTION TYPE
const ADD_ITEMS = "ADD_ITEMS"
//

export const fetchItems = () => {

  return dispatch => {

    fetch(apiURI)
    .then(response => response.json())
    .then(data => {

      const items = data.tweets
      console.log({items})

      dispatch(addItems({items}))
    })
  }

}

// SADA ZELIM DA DEFINISEM I IZVEZEM NOVU FUNKCIJU

function addItems({items}){
  return {type: ADD_ITEMS, payload: {items}}
}
