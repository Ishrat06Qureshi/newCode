import * as actionTypes from "./actionTypes";
 
const SaveUserInfo = ( data) => {
  
    return ({
        type:actionTypes.USER_INFO,
        data
    })
   }
   
   export default SaveUserInfo