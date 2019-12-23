import * as React from 'react';
import { ScrollView,
  View, KeyboardAvoidingView , Image} from 'react-native';
import axios from "axios";



import Company from "./Company";
import Customer from "./Customer";
import Address  from "./AddressComponent"
import { Spinner } from "native-base"
import { NavigationEvents } from 'react-navigation';
import  Input from "./Input";
import Button from "./Button"
import { disable_Button_Style , disable_Text_Style , enable_Button_Style , enable_Text_Style} from "../Styles"
import validation_functions from "../utils/validation_functions"; 

const initialState = {
    StepOne:true,
    StepTwo:true,
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
    postalCode:"",
    serverError:"",
    isLoading : false,
  
  }

class EmailForm extends React.Component {
    state = {...initialState}


 handleInputChange = ( fieldName , value) => {
  this.setState(({ [fieldName] : value}))
  validation_functions.updateValidators( fieldName , value )}


  handleNext = () => {
      console.log("handle text gets call")
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
     const disable = validation_functions.isFormValid(["email","password" ])
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
                 label = "CUSTOMER NUMBER (optional)"
                 placeHolderText="45321"
                 isSecureTextEntry = { false}
                 onChangeText= { this.handleInputChange}
                 errorName = "customerNumber" 
                 keyBoardType = "phone-pad"
                 value = {customerNumber}
                 />  
                 <Input
                 label = "EMAIL"
                 placeHolderText="john22@gmail.com"
                 isSecureTextEntry = { false}
                 onChangeText= { this.handleInputChange} 
                 errorName = "email" 
                 value = { email }
                 />
                   <Input
                 label = "PASSWORD"
                 placeHolderText="*******"
                 isSecureTextEntry = {true}
                 onChangeText= { this.handleInputChange}
                 errorName = "password" 
                 value = { password }
                 />  
                
                <Button 
                 onPressMethod  = {this.handleNext}
                 text = "Next"
                 buttonStyle = {disable ? enable_Button_Style : disable_Button_Style}
                 textStyle = { disable ? enable_Text_Style  :disable_Text_Style }
                 disable = { disable}
                 />
                     </View>
    </KeyboardAvoidingView>)
}

}
export default EmailForm 