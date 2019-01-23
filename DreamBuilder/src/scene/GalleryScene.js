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
import burger from '../assets/burger.jpg'
import panipuri from '../assets/panipuri.jpg'
import sprouts from '../assets/sprouts.jpg'
import biryaani from '../assets/biryaani.jpg'

 class GalleryScene extends Component{

  static navigatorStyle = singleScreenApplication;
  constructor(props) {

    super(props);
    this.state = {
      list: [
          { source: biryaani, dimensions: { width: 1000, height: 1000 } },
          { source: burger, dimensions: { width: 1000, height: 1000 } },
          { source: panipuri, dimensions: { width: 1000, height: 1000 } },
          { source: sprouts, dimensions: { width: 1000, height: 1000 } } 
        ]
    }
}
  componentDidMount() {
    fetch("https://build-buiz.firebaseio.com/gallery.json", {
        method: "POST",
        body: JSON.stringify({'name': this.state.title, 'logo': this.state.pickedImage})
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(parsedRes => {
        console.log(parsedRes);
    });
  } 

  pressImage() {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri, base64: response.data};
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          pickedImage: source
        });
      }
    });
    
  }
    render(){
      return(
          <View style={styles.container}>
              <View style={styles.searchContainer}>
                <Text style={styles.inputSearch}> Gallery</Text>
                <TouchableOpacity style={styles.icon} onPress={this.pressImage.bind(this)}>
                  <Icon name="ios-add" color="white" size={40} />
                </TouchableOpacity>
              </View>
              <Gallery
                style={{ backgroundColor: 'black' }}
                images={this.state.list}
            />
          </View>

      ) 
    }
  }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1
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
          borderColor: '#2542C7',
          color: 'black',
          paddingLeft: 10,
          marginBottom: 0
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
      icon: {
        padding: 7
      },
      mapContainer: {
      }
      
      })
      
      
      


export default GalleryScene;
