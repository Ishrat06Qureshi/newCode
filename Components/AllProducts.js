import React , { Component } from "react";
import { Spinner  , Text  } from "native-base";
import { View , TouchableOpacity , FlatList  , ScrollView} from "react-native"
import axios from "axios";
import Products from "./Products";
import Heading_style from  "../Styles/index";
import { Container} from "../Styles/index";

export default class AllProducts extends Component {
    state = {
        data : [],
        isLoading:true,
        search:"",    
        serverError :"",
        skippedProducts:0,
        loadingMore:false, 
        dataLength:0,
        activeTab : true,
        details:false,
        moreloader:true,
        showLoadMore:false,
        isErrorOccured  : false
      }

    changeShowLoadMore = () => {
      
      this.setState(({ showLoadMore:true}))
    }



      _renderItem = ({item}) => {
  
        return( 
         
       
            
        <Products
          productCode  = { item.productCode }
          description = { item.description} 
          uri = {item.imageLink}
          uom = {item.uom}
          description = { item.description}
        />
       
        )
    }

    
    fetchData = () => {
        const { skippedProducts } = this.state
        const { productName }=  this.props.navigation.state.params
        axios.defaults.timeout = 20000
        axios.get(`http://13.59.64.244:3000/api/products?noOfRecords=5&skip=${skippedProducts}&search=${productName}`).
        then(( response)  =>  this.setState( ( preState ) => {
           const length = response.data.length
          return({
            data:skippedProducts === 0 ? Array.from(response.data) :
             response.data.length? [...preState.data , ...response.data ]  :[...preState.data],
            isLoading : false,
            showLoadMore:false,
            isErrorOccured:false
            
          })
        })).catch ( err=> this.setState(({ serverError:err , isLoading:false , isErrorOccured:true , showLoadMore:false })))
      }
    

      _handleLoadMore = () => {
        this.setState(
          (prevState, nextProps) => ({
            skippedProducts: prevState.skippedProducts + 5,
            loadingMore: true,
            showLoadMore:true,
            isErrorOccured:false
          }),
          () => {

            
            this.fetchData();
          }
        );
      };
  
    render() {
        const { data , isLoading , skippedProducts , isErrorOccured } = this.state
        const { productName }=  this.props.navigation.state.params
        console.log( "isErrorOcured" , isErrorOccured  )
        return( <View style =  {{ flex:1}}>
                  <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:50 , marginBottom:25}}>
            <Text style = { Heading_style }> { productName } Products </Text>
            </View>
             
            {
                data.length? 
                <View style = {{ flex:1,justifyContent:"center" , alignItems:"center"}}>
                  <ScrollView >
                    
                <FlatList
                data={ data}
             
                renderItem={ this._renderItem}
                // onEndReached = { this._handleLoadMore }
              
              
                // onEndReachedThreshold={0.5}
               
                keyExtractor={(item, index) => item+index}
                />
             
               { !this.state.showLoadMore ? <Loader fetchMoreData = { this. _handleLoadMore}/>: 
               <Spinner color = "red"/> }
                {/* <View style  = {{ height:200 , width:"100%"}}></View> */}
                
                {isErrorOccured ?   <View style = {{ justifyContent:'center' , alignItems:"center"}}>
                  <Text> Sorry ! something went wrong</Text>
                </View>: null }
                <View style  = {{ height:50 , width:"100%"}}></View> 
              
              
               </ScrollView>
             </View> 
          : isLoading ? <Spinner color="red"/> : <View style = {{ justifyContent:'center' , alignItems:"center"}}> <Text> Sorry something went wrong </Text> </View>
            }
                   
                   
        </View>)
    }
    componentDidMount () {
        this.fetchData()
    } 
} 


const Loader = ( props ) => {
  return( <View>
    <TouchableOpacity onPress = { props.fetchMoreData}>
      <Text style = {{ color:"red"}}> Load more </Text>
    </TouchableOpacity>
  </View>)
}