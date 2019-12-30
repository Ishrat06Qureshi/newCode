import React  , { Component } from "react";
import { Spinner } from "native-base"
import { View  , AsyncStorage  , Text  } from "react-native";
import { connect } from "react-redux"
import TokenAction from "../Actions/tokenAction";
class Logout extends Component {
    signOutAsync = async () => {
        await AsyncStorage.clear();
      };
    render() {
          return( <View style = {{ justifyContent:"center" , alignItems:"center"}}>
            <Text>Logging out  </Text>
            <Spinner color = "red"/>
        </View>)
    }
    

    componentDidMount(){
        this.signOutAsync()
        this.props.removeToken()
        this.props.navigation.closeDrawer()
        this.props.navigation.navigate("WelcomeStack")

    }
}


const mapDispatchToProps = ( dispatch ) => {
    return( {
        removeToken  : () => dispatch(TokenAction.TOKEN_REMOVE_ACTION())
    })
}
export default connect(null , mapDispatchToProps)(Logout)