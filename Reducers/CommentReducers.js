import SaveCommentAction from "../Actions/SaveComments";

const intialState = {
    isLoading:false,
    hasError:false,
    comment:""
}

const commentReducer = (state = intialState , action) =>{
  
    switch(action.type){
        case SaveCommentAction.SAVE_COMMENT : {
            return {
                ...state,
                comment: action.comment
            }
        }
        default :
        return state
    }
 }

export  default commentReducer