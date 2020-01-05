import axios from "axios";
import SaveError from "../Actions/errorAction";
import validation_functions from "../utils/validation_functions"; 
import ClearUserInfo from "../Actions/clearData"
const SignupMiddleware = ( data ) => {
    axios.defaults.timeout = 20000
    
    const { email , customerNumber , password , companyName , lineOne,city, province , postalCode, 
    contactPersonName , phoneNumber  , navigateToEmailForm , navigateToCodeScreen , LoaderOn , LoaderOff , testAlert   } = data
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
                            if(!err.response) {
                                LoaderOff()
                                testAlert("Sorry ! something went wrong Please check the netwrork connection")
                            }
                            else if ( err.response)
                             {
                                dispatch( SaveError( {message:err.response.data.message}))
                                validation_functions.resetValidators()
                                dispatch(ClearUserInfo())
                                LoaderOff()
                                navigateToEmailForm()
                             }
                         
                        })
                    } 
}

export default SignupMiddleware