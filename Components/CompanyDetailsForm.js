import * as React from 'react';
import { ScrollView,
  View, KeyboardAvoidingView , Image, Text , TouchableOpacity} from 'react-native';
import axios from "axios";



import  Input from "./Input";
import Button from "./Button"
import { disable_Button_Style , disable_Text_Style , enable_Button_Style , enable_Text_Style} 
from "../Styles"
import validation_functions from "../utils/validation_functions"; 
import SaveUserInfo from "../Actions/UserInfoAction";
import { connect } from "react-redux";

import { GreyText } from "../Styles"


class CompanyDetailsForm extends React.Component {
  state = {
    contactPersonName: this.props.contactPersonName,
    companyName:this.props.companyName,
    phoneNumber:this.props.phoneNumber
  }

 handleInputChange = ( fieldName , value) => {
  this.setState(({ [fieldName] : value}))
  validation_functions.updateValidators( fieldName , value )}


  handleNext = () => {
    const data = {
      contactPersonName: this.state.contactPersonName,
      companyName:this.state.companyName,
      phoneNumber:this.state.phoneNumber
    }
    this.props.saveData(data)
      this.props.navigation.navigate("AddressForm")
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
    const {  StepOne , StepTwo , 
        email,
      customerNumber,
      password,
      companyName,
      officeAddress,
      contactPersonName,
      phoneNumber,
      lineOne,
      lineTwo,
      city,
      province,
      postalCode,
     serverError , isLoading } = this.state
     const disable = validation_functions.isFormValid(["companyName","contactPersonName","phoneNumber" ])
    return ( <KeyboardAvoidingView 
    style = {{ flex:1, justifyContent:"center" , alignItems:"center"}} behavior = "padding">
           <Image
                    source = {require("../assets/fastening.png")}
                    style = {{
                      height:135,
                      width:"100%",
                      resizeMode:"contain"
                    }}
                  />
                   { serverError ? <Text>{serverError}</Text> :  null }
                   <View style = {{ justifyContent:"center" , alignContent:"center"}}>
                   <Input
               label = "COMPANY NAME"
               placeHolderText="fastening housing atlantic"
               isSecureTextEntry = { false}
               onChangeText= { this.handleInputChange}
               errorName = "companyName" 
               keyBoardType = "default"
               value = { companyName}
               />  
                 
                 <Input
               label = "CONTACT PERSON NAME"
               placeHolderText="Dev"
               isSecureTextEntry = { false}
               onChangeText= { this.handleInputChange}
               errorName = "contactPersonName" 
               keyBoardType = "default"
               value = { contactPersonName }
               />  
                 <Input
               label = "PHONE NUMBER"
               placeHolderText="0123456789"
               isSecureTextEntry = { false}
               onChangeText= { this.handleInputChange}
               errorName = "phoneNumber" 
               keyBoardType = "phone-pad"
               value = { phoneNumber }
               />  
              <Button 
               onPressMethod = {this.handleNext}
               text = "Next"
               buttonStyle = {disable ? enable_Button_Style : disable_Button_Style}
               textStyle = { disable ? enable_Text_Style  :disable_Text_Style}
               disable = { disable }
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
    </KeyboardAvoidingView>)
} 

}


  const mapStateToProps = ( state ) => {
    console.log(state)
  
    return (
          data = {
            companyName : state.SignupInfoReducer.initialUserDataInfo.companyName,
            contactPersonName: state.SignupInfoReducer.initialUserDataInfo.contactPersonName,
            phoneNumber:state.SignupInfoReducer.initialUserDataInfo.phoneNumber
          }
    )
  
  }


const mapDispatchToProps = ( dispatch ) => {
  return {saveData : ( data )=>dispatch(SaveUserInfo(data)) }
}
export default connect(mapStateToProps , mapDispatchToProps )(CompanyDetailsForm)