import * as React from 'react';
import { Text,
  View, KeyboardAvoidingView , Image , TouchableOpacity} from 'react-native';
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
import SaveUserInfo from "../Actions/UserInfoAction";
import { connect } from "react-redux";
import { GreyText } from "../Styles"

class EmailForm extends React.Component {
    state = {
      customerNumber: this.props.customerNumber,
      email:this.props.email,
      password:this.props.password,
      
    }
     
 handleInputChange = ( fieldName , value) => {
   console.log(fieldName , value)
  this.setState(({ [fieldName] : value}))
  validation_functions.updateValidators( fieldName , value )}


  handleNext = () => {
    const data = {
      customerNumber: this.state.customerNumber,
      email:this.state.email,
      password:this.state.password
    }
    console.log(this.props)
    this.props.saveData(data)
    this.props.navigation.navigate("CompanyForm")

  }

  post = () => {
    const {    email,
      customerNumber,
      password,
      companyName,
       } = this.state
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
        email,
      customerNumber,
      password,
     
    //  serverError , 
    } = this.state
    const {  error } = this.props
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
                 
                   { error ? <Text>{error}</Text> :  null }
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
                  <View style = {{ justifyContent:"center" , alignItems:"center"}}>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate("Welcome")}>
              <Text style = { disable_Text_Style }> Back to login  </Text>
            </TouchableOpacity>
             </View>
                     </View>
    </KeyboardAvoidingView>)
} 

}

const mapStateToProps = ( state ) => {
  console.log(state)

  return (
         {
          customerNumber  : state.SignupInfoReducer.initialUserDataInfo.customerNumber,
          email: state.SignupInfoReducer.initialUserDataInfo.email,
          password:state.SignupInfoReducer.initialUserDataInfo.password,
          error: state.ErrorReducer.error.message
        }
  )

}
const mapDispatchToProps = ( dispatch ) => {
  return {saveData : ( data )=>dispatch(SaveUserInfo(data)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailForm) 