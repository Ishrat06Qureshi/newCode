import React , {Component }from 'react';
import { Text, View, StyleSheet, ImageBackground , Image   , Animated , Easing  } from 'react-native';
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import UserDataAction from "../Actions/UserDataAction";
import FillCart from "../Actions/fillCartAction"
class Splash  extends Component {

   constructor( props ) {
    super( props )
    this.RotateValueHolder = new Animated.Value(0);
   }


   bootstrapAsync = async () => {
     //changed data
    const userData = await AsyncStorage.getItem('userData');
    const cartData = await AsyncStorage.getItem('cartDetails');
    const ParsedUserData = JSON.parse(userData)
    const ParsedCartData = JSON.parse(cartData)
  
    console.log("parsed Data" ,ParsedCartData)
    ParsedUserData ? this.props.saveData(ParsedUserData) : null
    // ParsedCartData ? this.props.fillCart(ParsedCartData) : null
    this.props.navigation.navigate(ParsedUserData? ParsedUserData.token ? 'Home' : 'WelcomeStack' : "WelcomeStack");
  };

   componentDidMount () {

    this.StartImageRotateFunction();
    this.bootstrapAsync()
   setTimeout( () => {
     // this.props.navigation.navigate("Welcome")
    //  this.props.navigation.navigate(this.props.token ? 'Home' : "WelcomeStack");
    this.StartImageRotateFunction()
   } , 4500)
 }
   StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);

    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => this.StartImageRotateFunction());
  }
 

  checkLogin = () => {
    console.log(this.props)
   this.props.navigation.navigate(this.props.token ? 'Home' : "WelcomeStack");
  }
  render () {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
     return(
    
    <ImageBackground source={require("../assets/splash-bg.png")} 
    style = { styles.container}>

     <Image source = {require("../assets/fastening-logo.png") } style = { styles.logo}/>
      <View style = {{  flex: 1,

    justifyContent: 'center',
    alignItems:'center'}}>
      <Animated.Image
          style={{ 
            // top:"25%",
            // left:"35%",
            
            height:90,
            width:90,
            transform: [{ rotate: RotateData }],
            
            alignSelf:'center'
          }}
          source={ require("../assets/loder.png")}
        />
     
      </View>
     
  
  
      {/* <Image source = {require("../assets/loder.png")} 
      style = { styles.loader_container}/> */}


    </ImageBackground>
    
    )
  } 
  
}

const styles = StyleSheet.create({
 container :{
    flex:1,
    height:"100%",
    width:"100%",
    backgroundColor:"#DA011D"
 },
 loader_container:{
   top:"25%",
   left:"35%",
   height:90,
   width:90
 },
logo:{
  height:60,
  width:190,
  marginLeft:80,
  marginTop:90
  
}

  
})

const mapStateToProps = ( state ) => {
  return({
    token:state.tokenReducer.token
  })
}

const mapDispatchToProps = ( dispatch ) => {
   return ( {
     saveData : ( data ) => {  dispatch( UserDataAction.SAVE_USER_DATA_ACTION( data)) },
     fillCart : ( data ) => {  dispatch( FillCart(data)) }

   })
}

export default connect(mapStateToProps , mapDispatchToProps)(Splash)