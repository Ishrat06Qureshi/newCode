import * as React from 'react';
import { ScrollView,
  View, KeyboardAvoidingView ,
   Image , TouchableOpacity , Text , Alert} from 'react-native';
import axios from "axios";



import { Spinner } from "native-base"

import  Input from "./Input";
import Button from "./Button"
import { disable_Button_Style , disable_Text_Style , enable_Button_Style , enable_Text_Style} from "../Styles"
import validation_functions from "../utils/validation_functions"; 
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
import SignupMiddleware from "../Middleware/SignupMiddleware"
import SaveUserInfo from "../Actions/UserInfoAction";
import { GreyText } from "../Styles"
class AddressForm extends React.Component {
    state = {
      lineOne:this.props.lineOne,
      city:this.props.city,
      province:this.props.province,
      postalCode:this.props.postalCode,
      loading:false
    }
    testAlert = ( err) =>{
      alert(`${err}`)
      // console.log(err)
    }

LoaderOn = () => {
  this.setState({
    loading:true
  })
}
LoaderOff = () => {
  this.setState({
    loading:true
  })
}
 handleInputChange = ( fieldName , value) => {
  this.setState(({ [fieldName] : value}))
  validation_functions.updateValidators( fieldName , value )}

  navigateToEmailForm = () => {
    this.props.navigation.navigate("EmailForm")
  }
 

  navigateToCodeScreen = () => {
   this.props.navigation.navigate("CodeVerify")
 }
  handleNext = () => {
    const data = {
      lineOne:this.state.lineOne,
      city:this.state.city,
      province:this.state.province,
      postalCode:this.state.postalCode,
    }
       this.props.saveData(data)


       const SignupData = {
        email:this.props.email,
        customerNumber: this.props.customerNumber,
        password:this.props.password,
        companyName:this.props.companyName,
        contactPersonName:this.props.contactPersonName,
        phoneNumber:this.props.phoneNumber,
         lineOne:this.state.lineOne,
         city:this.state.city,
         province:this.state.province,
         postalCode:this.state.postalCode,
         navigateToEmailForm:this.navigateToEmailForm,
         navigateToCodeScreen:this.navigateToCodeScreen,
         LoaderOn:this.LoaderOn,
         LoaderOff : this.LoaderOff,
         testAlert : this.testAlert
       }
       
       NetInfo.fetch().then(state => {
        if(state.isConnected) {
          this.props.LoadSignUpData(SignupData)
       }
       else {
         Alert.alert("Internet connection is not available")
       }
    });
      
       
  }

  
   
  post = () => {
    const {    email,
      customerNumber,
      password,
      companyName,
      officeAddress,
      contactPersonName,
      phoneNumber , lineOne , lineTwo , city, province , postalCode } = this.state
     this.setState(({ isLoading: true , StepOne:true , }) , () =>

     {
      axios.post("http://13.59.64.244:3000/api/register" , 
      { email , customerNumber , password , companyName , officeAddress:`${lineOne} , ${city} , ${province} , ${postalCode}`  , 
      contactPersonName , phoneNumber  })
      .then(( response ) =>  
      {  console.log(response)
        if(response.data.message === "Done") {
          validation_functions.resetValidators()
          this.props.navigation.navigate("CodeVerify")
        }
      } )
       .catch ( err =>
        {
          validation_functions.resetValidators()
          return( this.setState(({
            isLoading: false , 
            serverError: err.response.data.message ,
            email:"",
            customerNumber:"",
            password:"",
            companyName:"",
            officeAddress:"",
            contactPersonName:"",
            phoneNumber:"",
            lineOne:"",
            lineTwo:"",
            city:"",
            province:"",
            postalCode:""})) )
        })
     })
     
    }
render() {
    const {
      lineOne,
     
      city,
      province,
      postalCode,
      loading ,  } = this.state
     const disable = validation_functions.isFormValid(["lineOne","city","province" , "postalCode" ])
    return ( 
    <KeyboardAvoidingView 
    style = {{ flex:1, justifyContent:"center" , alignItems:"center"}} behavior = "padding">
           <Image
                    source = {require("../assets/fastening.png")}
                    style = {{
                      height:135,
                      width:"100%",
                      resizeMode:"contain"
                    }}
                  />
                  { loading ? <Spinner color = "red" /> : <View>
                  
                   <View style = {{ justifyContent:"center" , alignContent:"center"}}>
                   <Input
    label = "Line 1"
    placeHolderText=""
    isSecureTextEntry = { false}
    onChangeText= { this.handleInputChange}
    errorName = "lineOne" 
    keyBoardType = "default"
    value = { lineOne }
    />  
     
      <Input
    label = "City"
    placeHolderText="Toronto"
    isSecureTextEntry = { false}
    onChangeText= { this.handleInputChange}
    errorName = "city" 
    keyBoardType = "default"
    value = { city }
    />  
      <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
        <Input
          label = "Province"
          placeHolderText="Alberta"
          isSecureTextEntry = { false}
          onChangeText= { this.handleInputChange}
          errorName = "province" 
          keyBoardType = "default"
          value = { province }
          />  
            <Input
          label = "Postal Code"
          placeHolderText="M4B 1B3"
          isSecureTextEntry = { false}
          onChangeText= { this.handleInputChange}
          errorName = "postalCode" 
          keyBoardType = "default"
          value = { postalCode }
          />  
          </View>
             
             
          <Button 
           onPressMethod = { this.handleNext }
           text = "Submit"
           buttonStyle = {disable ? enable_Button_Style : disable_Button_Style}
           textStyle = { disable ? enable_Text_Style  :disable_Text_Style}
           disable = { disable}
           />
                  

                  <View style = {{ justifyContent:"space-between" , alignItems:"center" , flexDirection:"row" , marginTop:20}}>
            <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
              <Text style  ={ GreyText} > Back </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate("Welcome")}>
              <Text style  ={ GreyText} > Back to Login</Text>
            </TouchableOpacity>
             </View> 
                     </View>
                  </View> }
                 
    </KeyboardAvoidingView>)
} 

}

const mapStateToProps = ( state ) => {
  console.log(state)

  return (
        data = state.SignupInfoReducer.initialUserDataInfo
  )

}
const mapDispatchToProps = ( dispatch ) => {
  return { 
    LoadSignUpData : ( data )=>dispatch(SignupMiddleware(data)),
    saveData : ( data )=>dispatch(SaveUserInfo(data))
  
  }
}


export default connect(mapStateToProps  , mapDispatchToProps)(AddressForm)