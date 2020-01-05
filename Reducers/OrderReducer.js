import * as actionTypes from "../Actions/actionTypes";




const initialOrderState = {
    items:[]
}
const orderReducer = ( state = initialOrderState, action ) => {
 switch(action.type) {
     
     case actionTypes.SAVE_ITEMS : {
         console.log("item product code" ,action.item.productCode )
         let alreadyExist = state.items.find( item => item.productCode === action.item.productCode)
          
         if( alreadyExist ) {
             newArray = state.items.filter( item => item.productCode !== action.item.productCode)
            
             alreadyExist.quantity = parseInt(alreadyExist.quantity) + parseInt(action.item.quantity)
           
             newArray = [...newArray , alreadyExist]
           
             return({
                 ...state,
                 items:[...newArray]
             })
         }

         else {
             return({
                 ...state,
                 items:[...state.items, action.item]
             })
         }

      
          
          
          
     }
     case actionTypes.EMPTY_ITEMS : {
        return({
            ...state,
            items: []
        })
    }

    case actionTypes.REMOVE_ITEMS : {

        return({
            ...state,
            items: state.items.filter(( item ) =>  item.productCode !== action.productCode)
        })
    }

    case actionTypes.EDIT_ITEM: {
        
        return({
            ...state,
            items: state.items.map(( item ) => 
             {
                 
                 if(item.productCode ===  action.productDetails.productCode)  {
                     item.quantity = action.productDetails.quantity
                 }
                 return item
                
             }
            
            ) 
           
        })
    }
    case actionTypes.FILL_CART : {
        return({
            ...state,
            items: [...action.items]
        })
    }
     default:
         return state 
 }
}
export default orderReducer 