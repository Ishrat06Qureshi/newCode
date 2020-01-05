import * as actionTypes from "../Actions/actionTypes";
 
const FillCart = (  items ) => {
    return ({
        type:actionTypes.FILL_CART,
        items
    })
   }
   
   export default FillCart