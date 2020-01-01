import TokenAction from "../Actions/tokenAction";
import UserDataAction from "../Actions/UserDataAction";
import SaveError from "../Actions/errorAction";
import axios from "axios";
import validation_functions from "../utils/validation_functions"; 
import { AsyncStorage } from "react-native";


signInAsync = async ( token , dispatch  , ResetState  ,
     navigateToHome , response) => {
     //changed  start
    await AsyncStorage.setItem('userData', JSON.stringify(response.data) );
    
    dispatch( TokenAction.TOKEN_SAVE_ACTION(response.data.token))
    dispatch( UserDataAction.SAVE_USER_DATA_ACTION( response.data))
    ResetState()
    navigateToHome()
     //changed  close
  };

const LoginMiddleware = ( data ) => {
     
    axios.defaults.timeout = 20000
    const { email , password , navigateToHome,OnLoader,
        ResetState,OnLoaderOff , testAlert  } = data
        return ( dispatch ) => {
                           OnLoader()
                        // return axios({
                        //     method: "post",
                        //     url: 'http://13.59.64.244:3000/api/authenticate',
                        //     timeout: 1000 * 1, // Wait for 5 seconds
                        //     headers: {
                        //       "Content-Type": "application/json"
                        //     },
                        //     data: {
                        //       email,
                        //       password
                        //     }
                        //   })
                        //     .then(response => {
                        //       const serverResponse = response.data;
                        //       // do sth ...
                        //     })
                        //     .catch(error => {
                        //       console.log(error);
                        //   });
                        return axios.post("http://13.59.64.244:3000/api/authenticate" , { email , password }  ) 
                        .then(( response ) =>  
                        {    
                            signInAsync(response.data.token , dispatch , ResetState , navigateToHome  , response)
                            // dispatch( TokenAction.TOKEN_SAVE_ACTION(response.data.token))
                            // dispatch( UserDataAction.SAVE_USER_DATA_ACTION( response.data))
                            // ResetState()
                            // navigateToHome()
                        }).catch ( err => {
                            const data = JSON.stringify(err)
                             console.log("data" , JSON.parse(data))
                             if(!err.response)
                             {
                                OnLoaderOff()
                                testAlert("Sorry ! there is no internet avaliable")
                             }
                             else if( err.response)  {
                                 console.log("error gets work")
                                dispatch( SaveError( {message:err.response.data.message}))
                                OnLoaderOff()
                             }
                             
                            // OnLoaderOff()
                            console.log("error response" , err.response)
                            
                        })
                    } 
}

export default LoginMiddleware