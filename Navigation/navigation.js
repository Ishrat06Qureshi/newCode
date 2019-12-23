
import { createStackNavigator ,
   createAppContainer ,

   createSwitchNavigator,
  } from "react-navigation";



import Splash from "../Components/NewSplash";
import Welcome from "../Components/Welcome";

import Finalogin from "../Components/FinalLogin";

import  CodeVerify from "../Components/CodeVerification"
import AddressForm from "../Components/AddressForm";
import CompanyDetailsForm from "../Components/CompanyDetailsForm"
import EmailForm from "../Components/EmailForm"
import AppDrawerNavigator from "./DrawerNavigator";



import { fromLeft,fromRight } from 'react-navigation-transitions'
const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
 
  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'Welcome'
    && nextScene.route.routeName === 'Finalsignup') {
    return fromLeft(500);
  } 
  // else if (prevScene
  //   && prevScene.route.routeName === 'ScreenB'
  //   && nextScene.route.routeName === 'ScreenC') {
  //   return zoomOut();
  // }
  return fromRight(500);
}


const signUpStack = createStackNavigator({
  EmailForm  :{
    screen:EmailForm,
    navigationOptions: {
     header: null},
  },
  CompanyForm : {
   screen:CompanyDetailsForm,
   navigationOptions: {
    header: null},
  },
  AddressForm : {
   screen:AddressForm,
   navigationOptions: {
    header: null},
  }
} , {
  initialRouteName:"EmailForm"
})

const WelcomeStack = createStackNavigator({
  Welcome:{
    screen:Welcome,
    navigationOptions: {
      header: null}
  },
  NewLogin:{
    screen:Finalogin,
    navigationOptions: {
      header: null}
  },
    Finalsignup:{
    screen:signUpStack,
    navigationOptions: {
      header: null}
  },
  CodeVerify:{
    screen:CodeVerify,
    navigationOptions: {
     header: null},
     
  },
} , {
  initialRouteName:"Welcome"
})


const mainStack  = createStackNavigator({
  mainApp:{
    screen:AppDrawerNavigator,
    navigationOptions:({ navigation }) => {
      return {
        header:null
      }
    }
  }
})



const AppSwitchNavigator = createSwitchNavigator({
  Splash:{
    screen:Splash,
    navigationOptions: {
      header: null}
    },
    WelcomeStack,
    
    Home:{
      screen: mainStack
    },
    

})
const AppContainer = createAppContainer( AppSwitchNavigator)



export default AppContainer