import React , { Component } from "react";
import {KeyboardAvoidingView, ScrollView , View, Text, Keyboard ,
   FlatList,
   AsyncStorage
 } from "react-native";
import { connect } from "react-redux";
import { NavigationEvents } from 'react-navigation';
import { Heading_style ,
        enable_Button_Style,enable_Text_Style, 
        centerBoldText
  } from "../Styles";
import Button from "./Button";


import CartItems from "../Components/CartItems";
import CommentBox from "./CommentBox";
import SaveCommentAction from "../Actions/SaveComments";

const initialState = {
    
    comment:"",
    
  } 

class CartDetails extends Component {

    state = {...initialState ,
      // items:this.props.items
    }

     handleCommentChange = ( fieldName , value ) => {
        this.setState(({ [fieldName] : value}))
    }
    Proceed = async ( ) => {
      //changed  start
      Keyboard.dismiss()
     await AsyncStorage.setItem('cartDetails', JSON.stringify(this.props.items) );
     this.props.SaveComment(this.state.comment)
     this.props.navigation.navigate("Cart")
  
     
     
      //changed  close
   };
     

  settingItems = () => {
    this.setState(({
      items : this.props.items
    }))
  }
  // componentWillReceiveProps = (nextProps) => {
    
  //    this.setState(({
  //      items:nextProps.items
  //    }))
  // }

  render() {
    const { items } = this.props
    const { comment } = this.state
    
      return( <KeyboardAvoidingView behavior = "padding" enabled>
      {/* <NavigationEvents
    
    onWillFocus={() => this.settingItems()}
    /> */}
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