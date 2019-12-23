import React , { Component } from "react";
import { View , Text ,  FlatList , TouchableOpacity , ScrollView  } from "react-native";
import { connect } from "react-redux";
import CustomText from "./CustomText";
import { Heading_style ,
        enable_Button_Style,enable_Text_Style, 
        centerBoldText
  } from "../Styles";
import Button from "./Button";

import { NavigationEvents , StackActions, NavigationActions } from 'react-navigation';
import CartItems from "../Components/CartItems";
import CommentBox from "./CommentBox";
import SaveCommentAction from "../Actions/SaveComments";
import { Keyboard } from "react-native"
const initialState = {
    
    comment:""
  } 
  
 class Cartdetails  extends Component {
     state = {...initialState}

     handleCommentChange = ( fieldName , value ) => {
      
       this.setState(({ [fieldName] : value}))
  
    }
     

      Proceed= () => {
        Keyboard.dismiss()
        this.props.SaveComment(this.state.comment)
        this.props.navigation.navigate("Cart")
     
      }
       render() {
         const { items } = this.props
         const { comment } = this.state
         return( <View style = {{ flex:1}}>
           
      
      {items.length ? <View  style = {{ justifyContent:"flex-end" , flexDirection:"row"}}> 
          <TouchableOpacity onPress = {() =>  this.props.navigation.navigate("EditOrder")}>
            <Text> Edit Cart  </Text>
          </TouchableOpacity>
          </View> : null }
                
                 <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:50 , marginBottom:25}}>
                               <Text style = { Heading_style }> Cart Details</Text>
                       </View>
                      
                      
              { items.length ? 
            
              <ScrollView keyboardShouldPersistTaps='always'>
              <View>
              <FlatList
              data = { items }
              renderItem = {( {item} ) =>{
                return( 
                <CartItems
                item = { item } />)
            }}
              keyExtractor = {( item , index ) => item+index }
             
              /> 
              <View>
                             <View style= {{ marginLeft:10 , marginRight:10 , marginBottom : 10 , marginTop:10}}>
                             
                             <CommentBox
                             label = "Additional Comments"
                             placeHolderText="Add Your Opnion"
                             isSecureTextEntry = { false}
                             onChangeText= {this.handleCommentChange}
                             value = { comment }
                             errorName="comment"
                          />
                     
                          </View>  
                          <View style = {{ justifyContent:"center" , alignItems:"center"}}> 
                          <Button 
                          onPressMethod = {this.Proceed}
                          text = "Proceed"
                          buttonStyle = { enable_Button_Style}
                          textStyle = { enable_Text_Style }
                          disable = { true }
                          />
                           <View style = {{ height:150 , width:"100%"}}></View>  
                           {/* <View style = {{ height:100 , width:"100%"}}></View> 
                           <View style = {{ height:20 , width:"100%"}}></View> 
                           <View style = {{ height:80 , width:"100%"}}></View>   */}
                          </View>
              </View>

              </View>
              </ScrollView>
              
              : <Text style = {centerBoldText}> No products Available</Text>  }
              
         </View>
        )
     }
 }


 const Item = ( {item} ) => {
     
    return( <View style = {{ flex:1 , flexDirection:"row", justifyContent:"center" , alignSelf:"center" , marginLeft:20}}>
        <View style = {{ flex:2}}>
        <CustomText
     label =  "Product Code"
     text = {item.productCode}
    />
        </View>
 
   <View style = {{ flex:1}}>
   <CustomText
     label =  "Quantity"
     text = {item.quantity}
    />
   </View>
    
    <View style = {{ flex:1}}>
        
    <CustomText
     label =  "UOM"
     text = {item.UOM}
    />
    </View>
</View>)
}
const mapStateToProps = ( state ) => {
   
    return({
      items:state.orderReducer.items,
     
    })
  }

  const mapDispatchToProps = ( dispatch  ) => {

    return({
      
      SaveComment : ( comment ) =>  dispatch(SaveCommentAction.SAVE_COMMENT(comment))
    })
  } 
export default connect(mapStateToProps , mapDispatchToProps  )(Cartdetails)
 