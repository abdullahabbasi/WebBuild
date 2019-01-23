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
import frame from '../assets/frame.jpg'
import Voice from 'react-native-voice'
import Tts from 'react-native-tts'

 class AboutUs extends Component{

  static navigatorStyle = singleScreenApplication;
  constructor(props) {
    super(props);
    this.state = {
        questions: [
            {name: 'When did you started this business ?', ans: ''},
            {name: 'Which cuisine do you provide ? ', ans: ''},
            {name: 'What are your speciality items?', ans: ''},
            {name: 'Do you also provide catering (Yes/No) ?', ans: ''},
        ],
        text: '',
        pointer: 0,
        pictures: [],
        pickedImage: null,
        results: []
    }
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    this._startRecognition.bind(this)
}

onSpeechResults(e) {
  // this.setState({
  //   results: e.value,
  // });
  this.ansChange(e.value[0]);
}

async _startRecognition(e) {
  try {
    console.log('started')
    await Voice.start('en-US');
  } catch (e) {
    console.error(e);
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
  nextClick() {
    this.setState((prevState) => { return {pointer: prevState.pointer + 1} })
  }

  doneClick() {
    // this.setState({
    //     text: 'We started in the year 2005. We serve the best Indian cuisine in Sunnyvale. The rich history, authentic experience, and quality are evident in the preparation of our food.  Our menu is designed to offer a variety of traditional indian soups, appetizers, curry, and dessert. Planning a special event? Our quality catering services will ensure that each of your guests leaves with a happy tummy. Proud to be best restaurant in Sunnyvale, we have been people’s first choice for special events, catering and authentic Indian food parties.'})
    this.setState((prevState) => { 
        text = 'We started in the year '+ this.state.questions[0].ans + '. We serve the best '+ this.state.questions[1].ans + ' cuisine in Sunnyvale. The rich history, authentic experience, and quality are evident in the preparation of our food.  Our menu is designed to offer a variety of traditional '+ this.state.questions[1].ans + ' ' + this.state.questions[2].ans + '. Planning a special event? Our quality catering services will ensure that each of your guests leaves with a happy tummy. Proud to be best restaurant in Sunnyvale, we have been people’s first choice for special events, catering and authentic '+ this.state.questions[1].ans + ' food parties.'
        fetch("https://build-buiz.firebaseio.com/about.json", {
          method: "POST",
          body: JSON.stringify({'about': text, 'image': prevState.pickedImage})
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        }); 
        return { text } 
      })   
    this.setState((prevState) => { return {pointer: prevState.pointer + 1} })
  }

  listenAbout(text) {
    Tts.speak(text, { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 0.5, KEY_PARAM_STREAM: 'STREAM_MUSIC' } });
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

ansChange(text) {
  const temp = this.state.questions; 
  temp[this.state.pointer].ans = text; 
  this.setState({questions: temp})
}
  render(){
    const ques = this.state.questions[this.state.pointer]
    const totalQuestions = this.state.questions.length
    return(
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.inputSearch}> About us</Text>
        </View>
        <View style={styles.content}>
            { this.state.pointer != totalQuestions && <View>
           <View style={styles.uploadContainer}>
              <Text style={styles.text}>Upload Image</Text>
              <View style={styles.uploadBtn} >
                  <TouchableHighlight
                    onPress={this.upload.bind(this)}
                    title="Upload"
                    style={styles.logoBtn}
                    ><Text style={styles.btnText}>Upload</Text></TouchableHighlight>
              </View>
            </View>

            <Image source={this.state.pickedImage} style={styles.picture} />
                <View style={styles.about}>
                    <Text style={styles.text}>Answer few questions and we will build this page for you. WOOHOO !!!</Text>
                        <View>
                            <View style={styles.containerStyle}>
                                <View style={{'width': '100%', height: 100, display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                                <Text style={styles.questions}>{ques.name}</Text>
                                  <TouchableOpacity onPress={ () => { this.listenAbout(ques.name) }}>
                                          <Icon name="md-volume-high" color="#black" size={30} />
                                  </TouchableOpacity>
                                </View>
                                
                                <View style={{'width': '100%', height: 100, display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                                  <TextInput  style={styles.inputTitle}  value={ques.ans} onChangeText={this.ansChange.bind(this)} />
                                  <TouchableOpacity style={{flex: 2}} onPress={this._startRecognition}>
                                    <Icon name="md-mic" color="#black" size={35} />
                                  </TouchableOpacity>
                                </View>
                                <View style={styles.nextContainer}>
                                    { this.state.pointer <= (totalQuestions - 2) ? <TouchableHighlight
                                        onPress={this.nextClick.bind(this)}
                                        style={styles.nextBtn}
                                    ><Text style={styles.nextText}>Next</Text></TouchableHighlight> : null}
                                    { this.state.pointer == (totalQuestions - 1) ? <TouchableHighlight
                                        onPress={this.doneClick.bind(this)}
                                        style={styles.nextBtn}
                                    ><Text style={styles.nextText}>Done</Text></TouchableHighlight> : null}
                                </View>
                            </View>
                        </View>
                </View>

            </View>  }
            { this.state.pointer == totalQuestions &&  <View><Text style={styles.header}>Welcome To Spice Cafe</Text>
                                    <Image source={this.state.pickedImage} style={styles.aboutPicture} />
                                    <View>
                                      <View style={{height: '5%', flexDirection: 'row'}}>
                                        <TouchableOpacity style={{paddingLeft: 15}}onPress={ () => { this.listenAbout(this.state.text) }}>
                                          <Icon name="md-volume-high" color="#black" size={30} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{paddingLeft: 15}} onPress={ () => { Tts.stop(); }}>
                                            <Icon name="md-volume-off" color="#black" size={30} />
                                      </TouchableOpacity>
                                      </View>                                   
                                  <Text style={styles.aboutText}>{'\t'} {'\t'} {'\t'} {'\t'}{'\t'} {this.state.text}</Text></View>
            </View>}
        </View>


      </View>
    ) 
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  about:{
      marginTop: 40,
      borderTopWidth: 1,
      borderColor: '#ddd',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#2542C7'
  },
  questions: {
    color: 'grey',
    padding: 10,
    fontSize: 17,
    fontStyle: 'italic'
  },
  uploadBtn: {
    paddingTop: 5,
    width: 100,
    height:10,
    alignSelf: 'flex-end',
    marginRight: 50,
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
    uploadContainer: {
        marginTop: 20
    },
    nextText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    height: 300
  },
  content: {
      padding: 10
  },
  titleContainer: {
    height: '25%'
  },
  text: {
    color: '#2542C7',
    fontSize: 17,
    padding: 7,
  },
  inputTitle: {
    flex: 8,
    width: '80%',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#2542C7',
    color: 'black',
    paddingLeft: 20,
    marginBottom: 0,
    margin: 20,
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
  nextContainer : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
    btnText: {
        color: 'white',
        textAlign: 'center',

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
    aboutPicture: {
        height: 300,
        width: '100%',
    },
    aboutText :{
        paddingTop: 20,
        color: 'grey',
        fontSize: 17,
        padding: 7,
        fontStyle: 'italic',
    }

})



export default AboutUs;
