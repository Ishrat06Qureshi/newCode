import * as React from 'react';
import {
   View , 
   Text ,
   TouchableOpacity,
   StyleSheet , BackHandler } 
   from "react-native";

   import { White_Button} from "../Styles"
   import * as Style from "../Styles/index";
   
   
   class Welcome extends React.Component {
    
    

     navigateToLogin = () => {

        this.props.navigation.navigate("NewLogin")
     }

     navigateToSignup = () => {
        
        this.props.navigation.navigate("Finalsignup")
     }
  
  
   render() {
     return(<View  style = {styles.container}>
        <View style = { styles.text_container}>
        <Text style = {styles.topText}> Welcome to FHA </Text>
        <Text style = {styles.topText}>  online store </Text>

      
        </View>

        <View style = { styles.button_container }>
          <TouchableOpacity style = { White_Button } onPress = { this.navigateToLogin } >
          <Text style = { [ styles.text , Style.boldText]}> Log in </Text>
          </TouchableOpacity>

           <TouchableOpacity  style = { White_Button } onPress = { this.navigateToSignup }>
               <Text style = {[styles.text , Style.boldText ]}> Sign up</Text>
          </TouchableOpacity>

        </View>
     </View>)
   }
    
   

  
   }

  
   const styles = StyleSheet.create({
     //used
     container:{
       flex:1,
       height:"100%",
       width:"100%",
       backgroundColor:"#DA011D"
     } ,
     topText:{
       
       fontSize:32,
       color:"#fff"
     },
     bottomText:{
         color:	"#fff",
         fontSize:25
     },
     //used
       text_container:{
          flex:3,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:200,
          marginTop:200
       },
    
     button_container :{
        flex:3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:80
     },

    text :{
       color:'#707070',
       textAlign: 'center',
       lineHeight:50,
       
     }

   })

  

  export default Welcome