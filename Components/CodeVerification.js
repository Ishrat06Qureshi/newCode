import React , { Component} from "react";
import { View , Text , BackHandler , KeyboardAvoidingView ,Image } from "react-native";
import { Spinner } from "native-base"
import Input from "./Input";
import { Heading_style} from "../Styles";
import axios from "axios"


export default class CodeVerify extends Component {
    state = {
        verifyCode : "",
        isLoading : false,
        attempts:0,
       
        
    }

    handleInputChange = ( fieldName , value) => {
        const { verifyCode } = this.state
        if ( verifyCode.length <=12) {
            this.setState(({ [fieldName] : value}))
            console.log("code length" , verifyCode.length)
        }
        if( verifyCode.length == 12 ) 
        {
            this.setState(({ isLoading : true }) , () => this.CodeVerification())
        }
       
     
    }

 CodeVerification = () => {
      const { verifyCode } = this.state
     axios.post("http://13.59.64.244:3000/api/verification" , { verifyCode }).
     then (( response) =>  
     {
        if ( response.status = 200)
        {
            this.props.navigation.navigate("NewLogin")
        }
     }).catch ( err=>   this.setState((preState) => {
         return({
             isLoading:false,
             attempts: preState.attempts + 1,
             ErrorMessage:"Invalid code",
             verifyCode:""
         })
     }))
 }
   componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', function() {
        return true;
      });
   }
    
    render() {
        const { isLoading , attempts , ErrorMessage  } = this.state
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
                 
                    { isLoading ?  <Spinner color = "red"/> :  
                     <View style = {{ justifyContent:"center" , alignItems:"center" }}>
                    <Text style = { Heading_style }> Code Verification</Text>
                    <Text> Please enter the Code</Text>
                
                
                
         {
            attempts <3 ? 
            
                <View>
                
                <Input  
            label = "Code"
            placeHolderText="7486547915"
            isSecureTextEntry = { false}
            onChangeText= { this.handleInputChange} 
            errorName = "verifyCode" 
            keyBoardType = "phone-pad"
            />
           
           { ErrorMessage ? <Text>{ ErrorMessage}</Text> : null }
            </View>
             : <Text style = {{ color :"red"}}> You have Exceed the limit  contact to Admin</Text>
         }
                    
                    </View>
                    
        }
        
         
                 
    </KeyboardAvoidingView>
        )
    }
}