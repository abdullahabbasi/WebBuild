import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Button, TouchableHighlight} from 'react-native'
import { singleScreenApplication } from '../styles/navigatorstyle'
import Icon from 'react-native-vector-icons/Ionicons'
//import ImagePicker from 'react-native-image-crop-picker'
import ImagePicker from 'react-native-image-picker';
import { Buffer } from 'buffer';
import ImageNativePicker from 'react-native-image-picker';
import Voice from 'react-native-voice'

class AddProduct extends Component {
    static navigatorStyle = singleScreenApplication;
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            pickedImage: null,
            headerColor: 'black'
        }
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        this._startRecognition.bind(this)
    }

    onSpeechResults(e) {
        // this.setState({
        //   results: e.value,
        // });
        //this.setState({headerColor: e.value[0]})
        this.setDescription(e.value[0])
    }

    publish() {
        fetch("https://build-buiz.firebaseio.com/product.json", {
            method: "POST",
            body: JSON.stringify({'title': this.state.title, 'description': this.state.description, 'image': this.state.pickedImage})
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            this.props.navigation.navigate('WelcomeScene'); 
        });
        // fetch("https://us-central1-build-buiz.cloudfunctions.net/storeImage",{
        //     method: 'POST',
        //     body: JSON.stringify({
        //         image: this.state.pickedImage.base64
        //     })
        // }).catch(err => console.log(err)).then(res => res.json()).then(parsedRes => {
        //     console.log(parsedRes);
        // });
    }
    upload() {
        console.log('clicked upload')
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
    
    setDescription(text) {
        this.setState({description: text})
    }

    async _startRecognition(e) {
        try {
          console.log('started')
          await Voice.start('en-US');
        } catch (e) {
          console.error(e);
        }
    }

    render() {
        //const images = this.state.pictures.map((image, id) => {return <Image style={{width: 100, height: 50,borderWidth: 1, borderColor: 'red'}} source={{uri: `data:image/png;base64,${image.data}`}}/>})
       return        <View style={styles.container}>
                        <View style={[styles.searchContainer, {backgroundColor: this.state.headerColor}]}>
                                {/* <TouchableOpacity style={styles.icon}>
                                        <Icon name="ios-arrow-round-back" color="white" size={20} />
                                </TouchableOpacity> */}
                            <Text style={styles.inputSearch}> Add Product </Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.titleContainer}>
                                    <Text style={styles.text}>Title</Text>
                                <TextInput style={styles.inputTitle}  value={this.state.title} onChangeText={(text) => this.setState({title: text})} />
                            </View>
                            <View style={{height: '20%', width: '100%'}}>
                                    <Text style={styles.text}>Description</Text>
                                    
                                    <View style={{'width': '100%', height: 100, display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                                        <TextInput style={[styles.inputTitle, {width: '90%'}]} value={this.state.description} onChangeText={(text) => {this.setDescription(text)}} />
                                        <TouchableOpacity style={{width: '10%'}} onPress={this._startRecognition}>
                                            <Icon name="md-mic" color="#black" size={35} />
                                        </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.uploadContainer}>
                                <Text style={styles.text}>Upload Images</Text>
                                <View style={styles.uploadBtn}>
                                    <TouchableHighlight
                                            onPress={this.upload.bind(this)}
                                            title="Upload"
                                            style={styles.logoBtn}
                                            ><Text style={styles.btnText}>Upload</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <Image source={this.state.pickedImage} style={styles.picture} />
                            <View style={styles.nextContainer}>
                                    <TouchableHighlight
                                        onPress={this.publish.bind(this)}
                                        title="Publish"
                                        style={styles.nextBtn}
                                        ><Text style={styles.btnText}>Publish</Text></TouchableHighlight>
                            </View>

                            
                        </View>
                    </View>
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    searchContainer :{
        height: '13%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputSearch: {
        width: '90%',
        color: 'white',
        marginBottom: 2,
        fontSize: 25,
      },
    content: {
        padding: 10
    },
    icon: {
        padding: 7
    },
    titleContainer: {
        height: '20%'
    },
    inputTitle: {
        flex:1,
        borderBottomWidth: 1,
        borderColor: '#C0C0C0',
        color: 'black',
        marginBottom: 0,
        fontSize: 17
    },
    descriptionContainer: {
        height: '20%'
    },
    imageContainer:{

    },
    text: {
        color: '#2542C7',
        fontSize: 15,
        padding: 7
    },
    picture : {
        width: '100%',
        height: 200
    },
    uploadBtn: {
        paddingTop: 5,
        width: 100,
        height:10,
        alignSelf: 'flex-end',
        marginRight: 50,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',

    },
    nextContainer : {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadContainer: {
        marginTop: 20
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

  picture : {
    width: 100,
    height: 100,
    marginLeft: 50,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black'
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
  
  })
  

  
export default AddProduct