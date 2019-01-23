import React, {Component} from 'react';
import {View, KeyboardAvoidingView, TextInput, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Button, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import WelcomeContainer from '../containers/WelcomeContainer';
import _ from 'lodash'
import { singleScreenApplication } from '../styles/navigatorstyle'

import ImagePicker from 'react-native-image-picker';
import { Buffer } from 'buffer';
import ImageNativePicker from 'react-native-image-picker';
import backgroundImg from '../assets/black.jpg'

 class Starter extends Component{

  static navigatorStyle = singleScreenApplication;
  constructor(props) {
    super(props);
    this.state = {
        pictures: [],
        pickedImage: null,
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

  upload() {
    var options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
      
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
nextClick() {
  fetch("https://build-buiz.firebaseio.com/website.json", {
      method: "POST",
      body: JSON.stringify({'name': this.state.title, 'logo': this.state.pickedImage})
  })
  .catch(err => console.log(err))
  .then(res => res.json())
  .then(parsedRes => {
      console.log(parsedRes);
  });
  this.props.navigation.navigate('LandingPage')
}

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.searchContainer}>
            <ImageBackground source={backgroundImg} style={styles.backImg}>
                <Text style={styles.inputSearch}>Dream Builder</Text>
            </ImageBackground>
        </View>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
              <Text style={styles.text}>Website Name</Text>
              <TextInput placeholder="Enter Your Website Name" placeholderTextColor="grey"  style={styles.inputTitle}  value={this.state.title} onChangeText={(text) => this.setState({title: text})} />
          </View>
           <View style={styles.uploadContainer}>
              <Text style={styles.text}>Upload Logo</Text>
              <View style={styles.uploadBtn} >
                  <TouchableHighlight
                    onPress={this.upload.bind(this)}
                    title="Upload"
                    style={styles.logoBtn}
                    ><Text style={styles.btnText}>Upload Logo</Text></TouchableHighlight>
              </View>
            </View>

            <Image source={this.state.pickedImage} style={styles.picture} />
        </View>
        <View style={styles.nextContainer}>
                <TouchableHighlight
                      onPress={this.nextClick.bind(this)}
                      style={styles.nextBtn}
                      ><Text style={styles.nextText}>Next</Text></TouchableHighlight>
        </View>
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    height: '25%'
  },
  body: {
    marginTop: 30,
    padding: 10,
    height: '40%',
    borderBottomWidth: 1,
    borderColor: '#C0C0C0',
  },
  text: {
    color: '#2542C7',
    fontSize: 15,
    padding: 7
  },
  inputTitle: {
    flex:1,
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
    width: '90%',
    color: 'white',
    marginBottom: 2,
    fontSize: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
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
  },
  picture : {
    width: 100,
    height: 100,
    marginLeft: 50,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black'
},
uploadBtn: {
    paddingTop: 5,
    width: 100,
    height:10,
    alignSelf: 'flex-end',
    marginRight: 50,

},
logoBtn : {
  width:120,
  paddingTop:10,
  paddingBottom:10,
  backgroundColor:'#2542C7',
  borderRadius:50,
  borderWidth: 1,
  marginTop: 30
},
nextBtn: {
  width:250,
  paddingTop:10,
  paddingBottom:10,
  backgroundColor:'#2542C7',
  borderRadius:50,
  borderWidth: 1,
  marginTop: 30,
  
},
btnText: {
  color: 'white',
  textAlign: 'center',
},
nextText: {
  color: 'white',
  fontSize: 20,
  textAlign: 'center',
},
uploadContainer: {
    marginTop: 20
},
nextContainer : {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
},
backImg : {
  width: '100%', 
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  textAlign: 'center'
}

})



export default Starter;
