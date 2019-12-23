import React , { Component } from "react";
import {KeyboardAvoidingView, ScrollView , View, Text, Keyboard , FlatList
 } from "react-native";
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

const initialState = {
    
    comment:""
  } 

class CartDetails extends Component {

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
      return( <KeyboardAvoidingView behavior = "padding" enabled>
            <ScrollView keyboardShouldPersistTaps='always'>
                        <View style= {{ justifyContent:"center", alignItems:"center", marginTop:10,marginBottom:10}} >
                            <Text style = { Heading_style }> Cart Details </Text>
                        </View>
                        {items.length ? <View>
                            <FlatList
              data = { items }
              renderItem = {( {item} ) =>{
                return( 
                <CartItems
                item = { item } />)
            }}
              keyExtractor = {( item , index ) => item+index }
             /> 
            <View style= {{ marginLeft:10 , marginRight:10 , marginBottom : 10 , marginTop:10}}>
                             
                             <CommentBox
                             label = "Additional Comments"
                             placeHolderText="Add Your Opnion"
                             isSecureTextEntry = { false}
                             onChangeText= {this.handleCommentChange}
                             value = { comment }
                             errorName="comment"
                          />
                        <View style = {{ justifyContent:"center" , alignItems:"center" , marginTop:10}}> 
                          <Button 
                          onPressMethod = {this.Proceed}
                          text = "Proceed"
                          buttonStyle = { enable_Button_Style}
                          textStyle = { enable_Text_Style }
                          disable = { true }/>
                     
                        </View>  
                        <View style = {{ height:50 , width:"100%"}}></View>
            </View>
</View> : <Text style = { centerBoldText}>No products avaliable</Text>}
                        
            </ScrollView>

      </KeyboardAvoidingView>)
  }
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
export default connect(mapStateToProps , mapDispatchToProps  )(CartDetails)