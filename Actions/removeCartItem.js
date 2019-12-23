import * as actionTypes from "./actionTypes";
 
const removeItem = (productCode ) => {
  
    return ({
        type:actionTypes.REMOVE_ITEMS,
        productCode
    })
   }
   
   export default removeItem