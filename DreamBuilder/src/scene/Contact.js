import React, {Component} from 'react';
import {View, TextInput, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Button, TouchableHighlight, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import WelcomeContainer from '../containers/WelcomeContainer';
import _ from 'lodash'
import { singleScreenApplication } from '../styles/navigatorstyle'

import ImagePicker from 'react-native-image-picker';
import { Buffer } from 'buffer';
import ImageNativePicker from 'react-native-image-picker';
import MapView  from 'react-native-maps'
import Gallery from 'react-native-image-gallery'
import headphoneImg from '../assets/headphone.jpg'

 class Contact extends Component{

  static navigatorStyle = singleScreenApplication;
  constructor(props) {

    super(props);
    this.state = {
        focusedLocation: {
            latitude: 37.3688,
            longitude: 122.0363,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        }
    }
}
  componentDidMount() {
    //   fetch("https://build-buiz.firebaseio.com/product.json", {
    //     method: "GET",
    // })
    // .catch(err => console.log(err))
    // .then(res => res.json())
    // .then(parsedRes => {
    //     console.log('get list ', parsedRes);
    //     this.setState({productList: parsedRes})
    
    // });
  } 

  render(){
    return(
        
      <View style={styles.container}>
        <View style={styles.searchContainer}>
            <Text style={styles.inputSearch}> Contact Us </Text>
        </View>
        <View style={styles.content}>
            <View style={styles.titleContainer}>
                    <Text style={styles.text}>Email Address</Text>
                <TextInput style={styles.inputTitle}  value={this.state.email} onChangeText={(text) => this.setState({email: text})} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>Phone Number</Text>
                <TextInput style={styles.inputTitle}  value={this.state.phone} onChangeText={(text) => this.setState({phone: text})} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>Street Address</Text>
                <TextInput style={styles.inputTitle}  value={this.state.address} onChangeText={(text) => this.setState({address: text})} />
            </View>
            <MapView style={styles.map} initialRegion={{
                latitude: 37.368832,
                longitude: -122.036346,
                latitudeDelta: 1,
                longitudeDelta: 1
                }}>

            {/* <MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={2}
                strokeColor="red"/> */}

            </MapView>
        </View>
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
  container: {

  },
  content: {
    padding: 10
  },
  titleContainer: {
    height: 80
  },
  text: {
    color: '#2542C7',
    fontSize: 15,
    padding: 7
  },
  inputTitle: {
    borderBottomWidth: 1,
    borderColor: '#C0C0C0',
    color: 'black',
    paddingLeft: 10,
    marginBottom: 0,
    fontSize: 17
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
    color: 'white',
    marginBottom: 2,
    fontSize: 20,
  },
  map: {
    width: '90%',
    height: 250,
    margin: '5%',
    

},
mapContainer: {
}

})



export default Contact;
