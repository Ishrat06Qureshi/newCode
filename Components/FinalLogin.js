import  React , {Component} from 'react';
import {View,  Image , ScrollView  , Text, Keyboard , TouchableOpacity , KeyboardAvoidingView   } from 'react-native';
import { Spinner } from "native-base"

import LoginMiddleware from "../Middleware/LoginMiddleware";
import { connect } from "react-redux";
import Input from "./Input"

import Button from "./Button";

// import Loading from "../Redux/Actions/LoadingAction"
import validation_functions from "../utils/validation_functions"; 
import { NavigationEvents } from 'react-navigation';

import { disable_Button_Style ,
  disable_Text_Style , 
  enable_Button_Style ,
   enable_Text_Style } from "../Styles"   
const initialState = {
      email:"",
      password:"",
      isLoading:false
}


 class Finalogin extends Component {
  constructor (props){
    super(props)
    this.state = {...initialState}
  }
  
   navigateToHome = () => {
     this.props.navigation.navigate("Home")
   }
   OnLoader = () => {
     this.setState(({ isLoading: true }))
   }
   ResetState = () => {
     validation_functions.resetValidators()
     this.setState(({...initialState}))
   }
   OnLoaderOff = () => {
     this.setState(({ isLoading : false }))
   }

   handleLogin = () => {
     Keyboard.dismiss()
      const { token , Login ,error }  = this.props 
       const { email , password }  =this.state
       
      Login({email , password , 
        navigateToHome:this.navigateToHome ,
         OnLoader:this.OnLoader ,
          ResetState:this.ResetState, 
          OnLoaderOff: this.OnLoaderOff} ) 
       }


  handleInputChange = ( fieldName , value) => {
    
    this.setState(({ [fieldName] : value.trim()}))
    validation_functions.updateValidators( fieldName , value )

  }

  



    render() {
  
    const disable = validation_functions.isFormValid(["email","password" ])
    const { token , error  } = this.props
    
    const { email , password , isLoading }  = this.state 

    return(
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
                     { isLoading ? <Spinner color = "red"/> : <View>
                       
                      {  error ? <Text>{error}</Text> :  null }
                     <View style = {{ justifyContent:"center" , alignContent:"center"}}>
                     <Input
                          label = "EMAIL"
                          placeHolderText="john22@gmail.com"
                          isSecureTextEntry = { false}
                          onChangeText= { this.handleInputChange} 
                          errorName = "email" 
                          value = {email }
                        
                         
                          />

                            <Input
                          label = "PASSWORD"
                          placeHolderText="*******"
                          isSecureTextEntry = { true }
                          onChangeText= { this.handleInputChange}
                          errorName = "password" 
                          value = {password}
                        
                          />

                          <Button 
                          onPressMethod = { this.handleLogin}
                          text = "Login"
                          buttonStyle = {disable ? enable_Button_Style : disable_Button_Style}
                          textStyle = { disable ? enable_Text_Style : disable_Text_Style }
                          disable = { disable}
                          />
                          {/* <TouchableOpacity onPress = {() => 
                            {  this.ResetState()
                              this.props.navigation.navigate("Finalsignup")} }>
                            <View style = { { justifyContent:"flex-end" , alignItems:"flex-end" , paddingTop:10} }>
                            <Text style = {{ color:"red"} } > Create ? </Text>
                            </View> */}
                            <View style = {{ justifyContent:"space-between" , alignItems:"center" , flexDirection:"row" , marginTop:20}}>
            <TouchableOpacity onPress = {() => {
              this.ResetState()
              this.props.navigation.navigate("Finalsignup")
            }}>
              <Text style  ={ { color:"red"}} > Create ? </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate("CodeVerify")}>
              <Text style  ={ { color:"red"}} > Verify Code ? </Text>
            </TouchableOpacity>
             </View> 
                         
                       
               
               
           
         
                       </View>
                       
                       </View>}
                    
      </KeyboardAvoidingView>

    )

  } 
}


const mapDispatchToProps = ( dispatch ) => {
   return({
     Login:( data ) => dispatch(LoginMiddleware( data )) 
   })
}

const mapStateToProps = ( state ) => {

  return({
    token: state.tokenReducer.token,
    error: state.ErrorReducer.error.message
  })
}
export default connect(mapStateToProps , mapDispatchToProps )(Finalogin)
