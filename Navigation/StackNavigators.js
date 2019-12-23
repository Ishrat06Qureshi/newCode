import React from "react"
import { createStackNavigator} from "react-navigation"
import Search from "../Components/Search"
import Home from "../Components/newHome";
import AllProducts from "../Components/AllProducts";
import Profile from "../Components/Profile";
import EditProfile from "../Components/EditProfile";

import CustomMainHeader from "../Components/CustomMainHeader";
import CartDetails from "../Components/testCartDetails";
import Cart from "../Components/testCart";
import EditOrder from "../Components/EditOrder";

export const HomeStack = createStackNavigator({
    Home : {
        screen: Home,
        navigationOptions: ({ navigation }) => {
         return {
             
             headerLeft: <CustomMainHeader screenProps = { navigation }/>
         }
        }
    },
    AllProducts : {
        screen: AllProducts,
},
CartDetails : {
    screen: CartDetails,
    navigationOptions: ({ navigation }) => {
     return {
        
         headerLeft: <CustomMainHeader screenProps = { navigation }/>
     }
    }
},
})
export const Searchstack = createStackNavigator({
    Search : {
        screen: Search,
        navigationOptions: ({ navigation }) => {
         return {
             
             headerLeft: <CustomMainHeader screenProps = { navigation }/>
         }
        }
    }
})
const ProfileViewStack = createStackNavigator({
    Profile : {
        screen: Profile,
        navigationOptions: {
        header: null} ,
    },
    EditProfile : {
        screen: EditProfile,
        navigationOptions: {
        header: null} ,
    }
})
export const ProfileStack = createStackNavigator({
    Profile:{
        screen:ProfileViewStack,
        navigationOptions: {
            header: null} ,
    }
})
export const CartStack = createStackNavigator({
    CartDetails : {
        screen: CartDetails,
        navigationOptions: ({ navigation }) => {
         return {
            
             headerLeft: <CustomMainHeader screenProps = { navigation }/>
         }
        }
    },
    Cart : { 
        screen: Cart,
},
EditOrder : {
    screen : EditOrder
}
})



