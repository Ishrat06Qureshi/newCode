import * as actionTypes from "./actionTypes";
 
const editItem = ( productDetails ) => {

    return ({ 
        type:actionTypes.EDIT_ITEM,
        productDetails
    })
   }
   
   export default editItem