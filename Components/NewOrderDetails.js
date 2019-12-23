import React from "react";
import { View, Text, ScrollView } from "react-native";
import CustomTextWithIcon from "./CustomTextWithIcon";
import CustomText from "./CustomText"
import * as Styles from "../Styles";
import  { 
    Entypo,
    AntDesign, 
    Feather
} from "@expo/vector-icons"

const  NewOrderDetails  = ( props ) => {
    const  {orderDetails} = props.navigation.state.params
    


return( <View style  ={{ flex:1}}>
<ScrollView contentContainerStyle = {{ marginLeft:10}}>
                
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {Styles.Heading_style }> Order Details </Text>
                    </View>
                
               <View style = {{ flexDirection:"row"}}>
                  <Text>Po Number</Text>
                  <Text>{orderDetails.poNumber}</Text>
              </View>
              <CustomTextWithIcon
                 IconComponent = {() =>  <AntDesign name= "barcode" size = {25}  color = "orange"/>}
                 label = "Customer Number"
                 text = {orderDetails.User.customerNumber }
               />

                 <CustomTextWithIcon
                  IconComponent = {() =>    <Entypo name = "calendar" size = {20} color = "orange"/>}
                  label = "Date of Order"
                  text = {orderDetails.createdDate.slice(0,10)}
               />
               <CustomTextWithIcon
                  IconComponent = {() =>    <Entypo name = "address" size = {20} color = "orange"/>}
                  label = "Shipping Address"
                  text = {orderDetails.shippingAddress}
               />

                      
                 <CustomTextWithIcon
                  IconComponent = {() =>    <Feather name = "shopping-cart" size = {20} color = "orange"/>}
                  label = "List of Items"
                  text = ""/>

                     { orderDetails.productDetail.map(( item , index ) => {
                                 return(   <View 
                                    style = {{ 
                                      
                                          height:50 ,
                                           width:"100%",
                                           flexDirection:"row" ,
                                           justifyContent:'space-around'}}
                                            key= {item+index}>
                                    <CustomText
                                          label = "Product Code"
                                          text = {item.productCode}/>
                                      
                            
                                      <CustomText
                                          label = "Quantity"
                                          text = {item.quantity}/>
                                      <CustomText
                                          label = "UOM"
                                          text = { item.UOM}
                                      />
                                      </View>)
              
                     })}
{/*                       
                      <View style = {{ height:80 , width:"100%"}}></View> 
                           <View style = {{ height:100 , width:"100%"}}></View>  */}
                           {/* <View style = {{ height:20 , width:"100%"}}></View> 
                           <View style = {{ height:80 , width:"100%"}}></View>  */}
</ScrollView>
</View>)
}



export default NewOrderDetails 