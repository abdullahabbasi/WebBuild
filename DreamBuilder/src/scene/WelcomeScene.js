import React, {Component} from 'react';
import {View, TextInput, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Button from 'react-native-button';
import { Actions as RouteActions} from 'react-native-router-flux';
import WelcomeContainer from '../containers/WelcomeContainer';

import ListItem from '../components/ListItem'
import _ from 'lodash'
import { singleScreenApplication } from '../styles/navigatorstyle'

 class WelcomeScene extends Component{
  static navigatorStyle = singleScreenApplication;
  
  constructor(props) {
    super(props)
    this.state = {
      productList : []
    }
  }
  componentDidMount() {
      fetch("https://build-buiz.firebaseio.com/product.json", {
        method: "GET",
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
        console.log('get list ', parsedRes);
        this.setState({productList: parsedRes})
    
    });
  } 
  pressAddProduct() {
    this.props.navigation.navigate('AddProduct');
  }
  render(){
  const list = _.map(this.state.productList, (product) => { console.log('product ', product); return (<ListItem  style={styles.item} description={product.description} title={product.title} image={product.image} onPressItem={this.onPressItem} />) })
    return(
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search Product" placeholderTextColor="white" style={styles.inputSearch}></TextInput>
          <TouchableOpacity style={styles.icon}>
            <Icon name="ios-search" color="white" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={this.pressAddProduct.bind(this)}>
            <Icon name="ios-add" color="white" size={40} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.list}>
          {list}
        </ScrollView>
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer :{
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'black',
  },
  inputSearch: {
    width: '70%',
    borderBottomWidth: 1,
    borderColor: 'white',
    color: 'white',
    marginBottom: 2
  },
  searchButton: {
    width: '20%'
  },
  productListContainer: {
    flex:1,
    backgroundColor: 'red'
  },
  icon: {
    padding: 7
  },
  item :{
    width: '100%',
  },
  list: {
    height: '87%',
  }

})



export default WelcomeScene;
