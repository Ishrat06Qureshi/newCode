import React from "react";
import {TextInput , Text , View ,KeyboardAvoidingView} from "react-native";
import {Red_Text } from "../Styles/index"
const CommentBox  = ( props ) => {
    const  {
        placeHolderText , 
     
        onChangeText  , 
        label,
        errorName,
        
       value ,
        customLabelColor} = props
    console.log( "value inside comment box ",value)
      
    return(
      <View>
        <Text style  = { Red_Text } > {label}</Text>
    <TextInput
        placeholder = { customLabelColor? "": placeHolderText}
        placeholderTextColor ={ customLabelColor? "white": "#999999"}
        
        underlineColorAndroid={ customLabelColor? "white":"transparent"}
        onChangeText = {(value) => onChangeText(errorName , value) }
    
      //   style = { White_Color_Text }
        value = { value }
        multiline={true}
        numberOfLines={4}
        style = {{ 
          textAlignVertical:"top" , 
           height: 100, 
           borderColor: '#F5F5F5',
            borderWidth: 1 , 
            borderRadius:0.5}}
        />
        
        </View>)
}

export default CommentBox