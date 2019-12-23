import React  , { Component } from "react";
import { View   } from "react-native";
import { connect } from "react-redux"
import TokenAction from "../Actions/tokenAction";
class Logout extends Component {
    
    render() {
          return( <View>
           
        </View>)
    }
    

    componentDidMount(){
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