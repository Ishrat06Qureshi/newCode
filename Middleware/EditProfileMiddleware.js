
import axios from "axios";
import UserDataAction from "../Actions/UserDataAction"



const EditProfileMiddleware = ( Data ) => {
   
    const { UpdatedData ,
         token , 
         userID  , 
         LoadingOn,
        LoadingOff,
        NavigateBackToProfile} = Data
  
        return ( dispatch ) => {
                        LoadingOn()
                        return axios.put(`http://13.59.64.244:3000/api/user/edit/${userID}` , 
                        { ...UpdatedData } ,
                         {headers: {"Authorization" : `Bearer ${token}`}} ) 
                        .then(( response ) =>  
                        {   
                       
                            dispatch(UserDataAction.EDIT_PROFILE(UpdatedData))
                            LoadingOff()
                            NavigateBackToProfile()
                        }).catch ( err => {
                          console.log(err)
                        })
                    } 
} 

export default EditProfileMiddleware