import TokenAction from "../Actions/tokenAction";
import SaveError from "../Actions/errorAction"
import OrderHistory from "../Actions/OrderHistory";
import axios from "axios";
import DeleteItem from "../Actions/EmptyOrder"
const SaveOrderMiddleware = ( data ) => {
    axios.defaults.timeout = 20000
    const { 
        createdBy , 
        shippingAddress,
        productDetail , 
        orderConformation , 
        additionalComments ,
        openModal,
        closeLoading ,
        checkError } = data
        console.log("modal value inside middleware" , openModal)
        return ( dispatch ) => {
                          openModal()
                        return axios.post(`http://13.59.64.244:3000/api/order`, { createdBy , shippingAddress, productDetail , additionalComments}  ) 
                        .then(( response ) =>  
                        {    
                            dispatch( OrderHistory.ADD_HISTORY( response.data))
                            dispatch(DeleteItem())
                            closeLoading()
                        }).catch ( err => {
                             closeLoading()
                             checkError()
                            // dispatch( SaveError( {message:err.response.data.message}))
                    
                        })
                    } 
}

export default SaveOrderMiddleware