import React , {Component }from 'react';
import { Text, View, StyleSheet, ImageBackground , Image   , Animated , Easing  } from 'react-native';
import { connect } from "react-redux"
class Splash  extends Component {

   constructor( props ) {
    super( props )
    this.RotateValueHolder = new Animated.Value(0);
   }

   componentDidMount () {

    this.StartImageRotateFunction();
   setTimeout( () => {
     // this.props.navigation.navigate("Welcome")
     this.props.navigation.navigate(this.props.token ? 'Home' : "WelcomeStack");
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

export default connect(mapStateToProps , null)(Splash)