import * as actionTypes from "../Actions/actionTypes";
const initialUserDataInfo = {
   customerNumber:"",
   email:"",
   password:"",
   companyName:"",
   contactPersonName:"",
   phoneNumber:"",
   lineOne:"",
    city:"",
   province:"",
   postalCode:""
 
}

const SignupInfoReducer  = ( state = { initialUserDataInfo }  , action ) => {
 switch ( action.type)  {
     case actionTypes.USER_INFO : {
         console.log("action",action)
        return ({
            ...state,
            initialUserDataInfo :{
                ...state.initialUserDataInfo,
                ...action.data
            }

        })
     }
     case actionTypes.CLEAR_USER_INFO : {
        return ({
            ...state,
            initialUserDataInfo :{
                ...initialUserDataInfo
            }

        })
     }
     default :
      return state 
 }
}
export default SignupInfoReducer