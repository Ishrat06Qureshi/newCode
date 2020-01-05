import  React , { Component } from "react";
import { NavigationEvents } from 'react-navigation';
import { View , Text , Image } from "react-native";
import { Card, CardItem , Button , Icon   } from 'native-base';
import { Image_styles , bold_Text } from "../Styles";
import Modal from "react-native-modal";
import ItemModal from "./ItemModal";
import { connect } from "react-redux";
import removeItem from "../Actions/removeCartItem"
class CartItems extends Component {
  state = {
    isModalVisible: false,
    quantity:this.props.item.quantity
  };

closeModal = () => {
    this.setState(({ isModalVisible:false}))
  }
  openModal = () => {

    this.setState(({ isModalVisible:true}))
   
  }
  SettingState = () => {
    this.setState(({
      quantity: this.props.item.quantity
    }))
  }
    render() {

        const  { productCode , description , image, UOM  } = this.props.item
        const { quantity } = this.state
         console.log("quantity inside the cart item" , quantity)
        const { isModalVisible} = this.state
        return( <View>
             <Card>
              <View style ={{ flexDirection:"row" }}>
              <NavigationEvents
    
    onWillFocus={() => this.SettingState()}
    />
                <CardItem>
                  
                                     <Image  
                       source={  { uri:image} }
                       style={ Image_styles} 
                      />
                      <View style ={{ flexDirection:"column" , paddingLeft:10}}>
                      <Text style={ bold_Text }> Product Description</Text>
                      <Text> { description }</Text>
                      <Text style={ bold_Text }> Product Code</Text>
                      <Text numberOfLines = { 0.5 }> { productCode } </Text>
                      <Text style={ bold_Text }> Unit of Measure </Text>
                      <Text numberOfLines = { 0.5 }> { UOM } </Text>

                      <Text style={ bold_Text }> quantity </Text>
                      <Text numberOfLines = { 0.5 }> { quantity } </Text>
                <View style = {{flexDirection:"row"}}>
                  <Button  transparent onPress = { this.openModal } >
                     <Icon name="ios-refresh"  style = {{ color:"#FFA500"}} />
                     <Text style = {{ color :"#A9A9A9"}}> Edit  </Text>
                   </Button>
                   <Button  transparent onPress = {() =>  this.props.removeItem(productCode) }>
                     <Icon name="ios-remove"  style = {{ color:"#FFA500"}} />
                     <Text style = {{ color :"#A9A9A9"}}> remove  </Text>
                   </Button>
                   </View>
                        </View>   
                        </CardItem> 
                    </View>


                    { isModalVisible ? 
                   <Modal isVisible = { isModalVisible}>
                     <View style = {{ flex:1}}>
                       
                    <ItemModal 
                     image= { image  ? image : "https://previews.123rf.com/images/yupiramos/yupiramos1708/yupiramos170812336/83821481-page-not-found-404-error-vector-icon-illustration-design-graphic.jpg"}
                     productCode = {productCode}
                     closeModal = {this.closeModal}
                     uom = {UOM}
                     
                     description = { description }
                    />
                    </View>
                   </Modal>
                 
                 
                 :null}
                    </Card>
                    </View> )
    }
}
const mapDispatchToProps = ( dispatch ) => {
  return({
   //  Login:( data ) => dispatch(LoginMiddleware(data )) 
     removeItem : ( data ) => dispatch(removeItem(data))
  })
}
export default connect (null , mapDispatchToProps)(CartItems)  