import React , { Component } from "react";
import  { View , Text, FlatList , ScrollView} from "react-native";
import CartItems from "../Components/CartItems";
import { connect } from "react-redux";
import { Heading_style ,
  

} from "../Styles";
class EditOrder extends Component {
    

  render() {
     const {items  } = this.props
     console.log("ediit order" , items)

      return( <View>
            <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:50 , marginBottom:25}}>
                               <Text style = { Heading_style }> Product List </Text>
                       </View>
            <ScrollView>
           <FlatList
            data = { items }
            renderItem = {( {item} ) =>{
                return( 
                <CartItems
                item = { item } />)
            }}
            keyExtractor = {( item , index ) => index.toString() }
           />
            <View style = {{ height:80 , width:"100%"}}></View> 
            <View style = {{ height:100 , width:"100%"}}></View> 
           </ScrollView>
      </View>)
  }
}

const mapStateToProps = ( state ) => {
    
    return({
        items:state.orderReducer.items
    })
}
export default connect(mapStateToProps, null)(EditOrder)