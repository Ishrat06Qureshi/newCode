import React , { Component } from "react";
import { View , Text , Image , Keyboard  , ScrollView} from "react-native";
import { Card} from "native-base"
import Input from "./Input";
import CustomText from "./CustomText";
import Button from "./Button";
import { NavigationEvents } from "react-navigation"
import validation_functions from "../utils/validation_functions"; 
import { connect } from "react-redux";
import SaveItem from "../Actions/OrderAction";
import editItem from "../Actions/editItem"
import { bold_Text ,    
    White_Square_button  , 
    Red_Text ,
    Red_Square_button,
    White_Text,
    disable_Button_Style ,
  disable_Text_Style , 
  enable_Button_Style ,
   enable_Text_Style,
   ModalStyles
    
     } from "../Styles";
  
     

const  initialState = {
  quantity :""
}
 
 class ItemModal extends Component {
    state = {
        ...initialState
    }
    
    handleInputChange = ( fieldName , value) => {
        this.setState(({ [fieldName] : value.trim()}))
        validation_functions.updateValidators( fieldName , value )
    
      }
      

      handleEdit = ( productCode, quantity   ) => {

        const { closeModal } = this.props
        Keyboard.dismiss()
         this.setState(({...initialState}) , ()=> {
           validation_functions.resetValidators()
           closeModal()
         })
         
        this.props.editCartItem({productCode, quantity })
      }
    render() {
      const disable = validation_functions.isFormValid([ "quantity" ])
        const { image , productCode , items ,  closeModal, uom  , description} = this.props
        const { quantity } = this.state
        
       
        return( <View >
             <NavigationEvents
      onDidBlur={() => this.setState(({...initialState}))}
      />
               <Card style = {{ ...ModalStyles, borderRadius:25}}>
                   
               <Image
                 source = {{ uri:image}}
                 style = {{
                     height:150,
                     width:"100%",
                     resizeMode:"contain"
                 }}
               />
               
               
           
                 <ScrollView keyboardShouldPersistTaps = "always" contentContainerStyle = {{ justifyContent:"center",alignSelf:"center"}}>
                  <View style = {{paddingLeft:-10}}>
                  <CustomText
                 label = "Product Code"
                 text = { productCode }
               />
               <CustomText
                 label = "Unit of Measure"
                 text = { uom }
               />
                  </View>
                
                
              <Input
               label = "quantity"
               placeHolderText="0"
               isSecureTextEntry = { false}
               onChangeText= { this.handleInputChange}
               errorName = "quantity" 
               keyBoardType = "phone-pad"
               /> 
               </ScrollView>
               <View style = {{ justifyContent : "flex-end"}}>
                  <View style = {{ flexDirection:"row" , justifyContent:"space-evenly" , marginBottom:25}}>
                    
               <Button
                       buttonStyle = {  White_Square_button }
                       textStyle = { Red_Text }
                       text  = "Submit"
                       onPressMethod = { ()=>this.handleEdit( productCode , quantity )}
                       buttonStyle = {disable ? [enable_Button_Style, White_Square_button] :[ disable_Button_Style , White_Square_button ]}
                       textStyle = { disable ? enable_Text_Style    :disable_Text_Style }
                       disable = { disable}
                      />
                        <Button
                       buttonStyle = {  White_Square_button}
                       textStyle = { Red_Text }
                       text  = "Cancel"
                       onPressMethod = {closeModal}
                       disable = {true}
                      />
                      </View>
               </View>
               </Card>
        </View>)
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return({
     //  Login:( data ) => dispatch(LoginMiddleware(data )) 
      
       editCartItem : ( data ) => dispatch(editItem(data))
    })
 }


export default connect(null , mapDispatchToProps )(ItemModal)