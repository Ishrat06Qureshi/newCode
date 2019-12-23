import UserDataAction from "../Actions/UserDataAction";

const UserDataReducer = ( state = {} , action ) => {
  switch(action.type) {
    case UserDataAction.SAVE_USER_DATA:{
      const [ lineOne , city ,  province , postalCode ] = action.UserData.officeAddress.split(",")
      
        return({
            ...state,
            UserData:{
              ...action.UserData,
              lineOne,
              city,
              province,
              postalCode
            }
        })
    }

    case UserDataAction.EDIT_PROFILE:{

      
        return({
            ...state,
            UserData:{
              ...action.userData
             
            }
        })
    }

    default:
        return state 
  }
}

export default UserDataReducer