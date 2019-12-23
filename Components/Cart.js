//Important
import React , { Component } from "react";
import { View , Text  , Alert , ScrollView , Keyboard , TouchableOpacity   } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { Heading_style , Red_Button , White_Text , 
  Red_Square_button,
   White_Square_button,
   Red_Text,
   enable_Button_Style,enable_Text_Style, 
   disable_Button_Style, 
   disable_Text_Style,
   centerBoldText
  } from "../Styles";
import { Card , Spinner } from "native-base"
import Button from "./Button";
import validation_functions from "../utils/validation_functions"; 
import { NavigationEvents , StackActions, NavigationActions } from 'react-navigation';
import Input from "./Input";
import DeleteItem from "../Actions/EmptyOrder"
import SaveOrderMiddleware from "../Middleware/SaveOrderMiddleware";

const initialState = {
  orderPlace:false,
  lineOne:"",
  city:"",
  province:"",
  postalCode:"",
  showAddress:false,
  sameAsOffice:false,
  Different:false,
  isDefaultAddress:false,
  SameAsOfficeActive:false,
  DifferentActive:false,
  isLoading:false,
  phoneNumber:"",
  comment:""
}




const popAction = StackActions.pop({ n: 1, })
 
class Cart extends Component {
  
   state = {
     ...initialState,
     isModalVisible: false,
     isLoading:true 
    
    }

    openModal = () => {
      console.log("open modal gets call")
      this.setState(({isModalVisible:true}))
    }
    
    closeModal = () => {
      this.setState(({isModalVisible:false}))
     
      this.props.navigation.navigate("Cart")
    }

    closeLoading = () => {
      this.setState(({ isLoading: false }))
    }

   handleInputChange = ( fieldName , value) => {
    this.setState(({ [fieldName] : value}))
    validation_functions.updateValidators( fieldName , value )

  }

  handleCommentChange = ( fieldName , value) => {
    this.setState(({ [fieldName] : value}))
  }
  
    Proceed= () => {
      
      this.props.SaveComment(this.state.comment)
        this.setState(({ orderPlace: true }))
    }
    
     orderConformation = () => {
        return(Alert.alert(
          'Order Confirmation',
          'Your order has been received , FHA will shortly contact you',
          [
            
            
            {text: 'OK', onPress: () =>
            { 
              this.props.navigation.dispatch(popAction)
              this.props.navigation.navigate("Cart")
          } } ,
          ],
          {cancelable: false},
        ))
     }
  
    placeOrder = () => {
      Keyboard.dismiss()
      const { items , userData , OrderSave , comment } = this.props
      console.log("comment inside the order place screen" , comment )
      const { sameAsOffice, lineOne, city, province, postalCode } = this.state
      const shippingAddress =  sameAsOffice ? userData.officeAddress :  `${lineOne},${city} , ${province},${postalCode}`
      const data = {
        createdBy:userData.id,
        shippingAddress,
        productDetail:items,
        orderConformation:this.orderConformation,
        additionalComments:comment,
        openModal:this.openModal,
        closeLoading: this.closeLoading
       
      }
     
       OrderSave( data )
    }


    SameOfficeAddress = (  ) => {
      console.log("change office address ")
      this.setState(({ 
        showAddress:true,
        sameAsOffice:true,
        isDefaultAddress:true,
        SameAsOfficeActive:true,
        differentOfficeAddress:false
         
      }))
    }

    differentOfficeAddress = (  ) => {
   
      this.setState(({ 
        showAddress:true,
        sameAsOffice:false,
        SameAsOfficeActive:false,
        differentOfficeAddress:true
      }))
    }
    
 render() {

    
     const { 
     lineOne,
     city,
     province,
     postalCode,
     showAddress,
    sameAsOffice,
     differentOfficeAddress,
    phoneNumber,
    isModalVisible,
    isLoading,
     
  } = this.state
     const disable = validation_functions.isFormValid(["lineOne","city","province","phoneNumber" ])
     
     const disableSameAddress= validation_functions.isFormValid(["phoneNumber"])
     
     console.log("modal value" , isModalVisible)
      return(

          <View>
             <NavigationEvents
      onDidBlur={() => {
        this.setState(({...initialState}))
   
      }
        }
      />   
      
            
             <View>
              <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:50 , marginBottom:25}}>
            <Text style = { Heading_style }> Place Order</Text>
            </View>
            <Text style = {centerBoldText}>Shipping Address </Text>
         
            <View style = {{  justifyContent:"center" }}>
            <View style  ={{ flexDirection:"row" , justifyContent:"space-around" , 
            marginTop:20 , marginBottom:30}}>

                         

                     <Button  
                    
                      text  = " Same as office"
                      onPressMethod = {this.SameOfficeAddress}
                      disable = {true}
                      buttonStyle = {sameAsOffice ? Red_Square_button:White_Square_button}
                      textStyle = { sameAsOffice ?White_Text : Red_Text}
                     />
                      <Button
                  
                       text  = "Other"
                       onPressMethod = { this.differentOfficeAddress}
                       disable = {true}
                       buttonStyle = {differentOfficeAddress ? Red_Square_button:White_Square_button  }
                       textStyle = {differentOfficeAddress? White_Text : Red_Text }
                      />
                      </View>
                      { showAddress ? sameAsOffice ? 
                      <ScrollView 
                      contentContainerStyle = {{ 
                        justifyContent:"center" , alignSelf:"center"
                      }}
                      keyboardShouldPersistTaps='always' 
                      >
                      <Input
                         label = ""
                         placeHolderText="shipping address"
                         isSecureTextEntry = { false}
                         onChangeText= { this.handleInputChange}
                         errorName = "shippingAddress" 
                         defaultAnswer = { this.props.userData.officeAddress}
                         edit = { false }
                      /> 
                        <Text style = {{ ...centerBoldText,marginTop:20 , marginBottom:30 }}>
                           Contact Details </Text>
                             <Input
                              label = "PHONE NUMBER"
                              placeHolderText="0123456789"
                              isSecureTextEntry = { false}
                              onChangeText= {this.handleInputChange}
                              errorName = "phoneNumber" 
                              keyBoardType = "phone-pad"
                              value = { phoneNumber }
                              />  
                      <View style = {{ justifyContent:"center" , alignSelf:"center"}}>
                       <Button 
                              onPressMethod = { this.placeOrder }
                              text = "Submit"
                              buttonStyle = {disableSameAddress ? enable_Button_Style : disable_Button_Style}
                              textStyle = { disableSameAddress? enable_Text_Style  :disable_Text_Style}
                              disable = { disableSameAddress }
                              />
                        </View>
                                <View style = {{ height:250 , width:"100%"}}></View>
                                <View style = {{ height:250 , width:"100%"}}></View>
                                <View style = {{ height:250 , width:"100%"}}></View>
                             
                      </ScrollView>
                      
                      : <ScrollView 
                      contentContainerStyle = {{ justifyContent:"center" , alignSelf:"center"}}
                      keyboardShouldPersistTaps='always' 
                      >

                        <Input
                        label = "Line 1"
                        placeHolderText="1 Moore Rd,"
                        isSecureTextEntry = { false}
                        onChangeText= { this.handleInputChange}
                        errorName = "lineOne" 
                        keyBoardType = "default"
                        value = { lineOne }
                        />   
                        
                          <Input
                        label = "City"
                        placeHolderText="Darthmouth"
                        isSecureTextEntry = { false}
                        onChangeText= { this.handleInputChange}
                        errorName = "city" 
                        keyBoardType = "default"
                        value = { city }
                        />  
                    
                            <Input
                              label = "Province"
                              placeHolderText="Nova Scotia"
                              isSecureTextEntry = { false}
                              onChangeText= { this.handleInputChange}
                              errorName = "province" 
                              keyBoardType = "default"
                              value = { province }
                              />  
                                <Input
                              label = "Postal Code"
                              placeHolderText="eg B3B 1J1"
                              isSecureTextEntry = { false}
                              onChangeText= { this.handleInputChange}
                              errorName = "postalCode" 
                              keyBoardType = "default"
                              value = { postalCode }
                              />  
                                <Text style = {{ ...centerBoldText,marginTop:20 , marginBottom:30 }}>
                               Contact Details </Text>
                             <Input
                              label = "PHONE NUMBER"
                              placeHolderText="0123456789"
                              isSecureTextEntry = { false}
                              onChangeText= {this.handleInputChange}
                              errorName = "phoneNumber" 
                              keyBoardType = "phone-pad"
                              value = { phoneNumber }
                              />  
                               <View style = {{ justifyContent:"center", alignSelf:"center"}}>
                 
                               <Button 
                              onPressMethod = { this.placeOrder }
                              text = "Submit"
                              buttonStyle = {disable ? enable_Button_Style : disable_Button_Style}
                              textStyle = { disable ? enable_Text_Style  :disable_Text_Style}
                              disable = { disable}
                              />
                              
                            
                                 </View> 



                                
                                <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View>

                                {/* <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View> */}
                      </ScrollView> : null }
                  
                  
             
            </View> 
                
             </View> 
             { isModalVisible ? 
                   <Modal isVisible = { isModalVisible}>
                     <View style = {{ flex:1 , justifyContent:"center" , alignItems:"center"}}>
                       
                      <Card style = {{ height:200 , justifyContent:"center" , alignItems:"center" , width:"80%" }}>
                        <Text style = {Heading_style}> Order Confirmation </Text>
                        {isLoading ? <Spinner color = "red"/> :
                        <View style = {{ justifyContent:"center" , alignItems:"center" , marginHorizontal:10}}>
                         <Text style = {{ color:"#696969"}}>
                          Congratulations! your order have been place Fastening House Atlantic will contact you shortly</Text>
                          </View>
                          }
                        
                         


                       {!isLoading ?  <TouchableOpacity style = {{...Red_Square_button , marginVertical:10}} onPress = { this.closeModal}>
                     <Text style = { White_Text}> Ok </Text>
                   </TouchableOpacity>: null }   
                          
                  
                              
                      </Card>
                    </View>
                   </Modal>
                 
                 
                 :null}
          </View> )
 }
}


const mapStateToProps = ( state ) => {
  
    return({
    
      userData:state.UserDataReducer.UserData,
      comment : state.commentReducer.comment,
      items:state.orderReducer.items,
    })
  }

  const mapDispatchToProps = ( dispatch  ) => {

    return({
      DeleteItem : (  ) => dispatch(DeleteItem()),
      OrderSave : (data) => dispatch(SaveOrderMiddleware(data)),
  
    })
  } 
export default connect(mapStateToProps , mapDispatchToProps  )(Cart)