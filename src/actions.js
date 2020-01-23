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
