import axios from "axios";
import SaveError from "../Actions/errorAction";
import validation_functions from "../utils/validation_functions"; 
import ClearUserInfo from "../Actions/clearData"
const SignupMiddleware = ( data ) => {
    
    
    const { email , customerNumber , password , companyName , lineOne,city, province , postalCode, 
    contactPersonName , phoneNumber  , navigateToEmailForm , navigateToCodeScreen , LoaderOn , LoaderOff  } = data
        return ( dispatch ) => {
                            LoaderOn()
                        return axios.post("http://13.59.64.244:3000/api/register" , { 

                            email , customerNumber , password , companyName , officeAddress:`${lineOne} , ${city} , ${province} , ${postalCode}`  , 
                            contactPersonName , phoneNumber 
                        }) 
                        .then(( response ) =>  
                        {   
                        validation_functions.resetValidators()
                          dispatch(ClearUserInfo())
                         LoaderOff()
                         navigateToCodeScreen()
                         
                        }).catch ( err => {
                            dispatch( SaveError( {message:err.response.data.message}))
                            LoaderOff()
                            navigateToEmailForm()
                        })
                    } 
}

export default SignupMiddleware