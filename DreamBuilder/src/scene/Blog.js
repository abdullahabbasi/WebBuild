import React, {Component} from 'react';
import {View, TextInput, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Button, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import WelcomeContainer from '../containers/WelcomeContainer';
import _ from 'lodash'
import { singleScreenApplication } from '../styles/navigatorstyle'

import ImagePicker from 'react-native-image-picker';
import { Buffer } from 'buffer';
import ImageNativePicker from 'react-native-image-picker';
import { TabNavigator, createTabNavigator } from 'react-navigation'
import Voice from 'react-native-voice'
import Tts from 'react-native-tts'
import blackImg from '../assets/black.jpg'
import whiteImg from '../assets/white.jpg'


 class Blog extends Component {

  static navigatorStyle = singleScreenApplication;
  constructor(props) {
    super(props);
    this.state = {
        edit: false,
        blogObj: null,
        draftList: [],
        publishList: []
    }
}
  componentDidMount() {

  }

nextClick() {
  this.props.navigation.navigate('LandingPage')
}

setBlogObj (obj, item) {
  console.log('setBlogObj', obj, item)
  if( item === 1) {
    this.setState( prevState => { return {publishList: prevState.publishList.concat(obj)}}); 
  }
  if (item === 2) {
    this.setState( prevState => { return {draftList: prevState.draftList.concat(obj)}});
  }

  this.setState({edit: false})
}
  render(){
    return(
      <View style={styles.container}>
        { !this.state.edit && 
        <View>
          <View style={styles.searchContainer}>
            <Text style={styles.inputSearch}> Story </Text>
            <TouchableOpacity style={styles.icon} onPress={() => {this.setState({'edit': true})}}>
              <Icon name="ios-add" color="white" size={40} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Icon name="md-more" color="white" size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Tabs screenProps={{'draftList' : this.state.draftList, 'publishList': this.state.publishList}}/>
          </View>
        </View>   
       }
        {this.state.edit && <View>
          <EditBlog setBlogObj={this.setBlogObj.bind(this)}/>
        </View>}
      </View>
    ) 
  }
}

export class EditBlog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      pickedImage: null,
      editor: 1,
      text: '',
      title: '',
      label: '',
      theme: 1
    }
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
  capitalize ([first,...rest]) {
    return first.toUpperCase() + rest.join('').toLowerCase();
  }

  onSpeechResults(e) {
    console.log('started')
    this.setState((prevState) => { return {text: ' ' + prevState.text + ' ' + this.capitalize(e.value[0]) + '.'}});
  }

  async _startRecognition(e) {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
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

  pressSave(item) {
    const date = new Date().toLocaleDateString();
    this.props.setBlogObj({title: this.state.title, image: this.state.pickedImage, text: this.state.text, label: this.state.label, date}, item)
    if (item === 1) {
      this.publish(this.state.title, this.state.pickedImage, this.state.text, this.state.label, date, this.state.theme)
    }    
  }

  publish(title, img, text, label, date, theme) {
      fetch("https://build-buiz.firebaseio.com/blogs.json", {
          method: "POST",
          body: JSON.stringify({'title': title, 'text': text, 'image': img, 'label': label, 'date': date, 'theme': theme})
      })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
          console.log(parsedRes);
          this.props.navigation.navigate('WelcomeScene'); 
      });
  }

  render () {
    console.log('final state theme', this.state.theme)
    return ( 
      <View>
        { this.state.editor === 1 && <View style={{height: '100%'}}>
            <View style={styles.searchContainer}>
              <Text style={styles.inputSearch}> Story </Text>
              <TouchableOpacity style={styles.icon} onPress={ () => {this.setState({editor: 3})}}>
                <Icon name="md-eye"color="white" size={30} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={ () => {this.pressSave(2)}}>
                <Icon name="md-archive"color="white" size={30} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={() => {this.pressSave(1)}}>
                <Icon name="md-paper-plane" color="white" size={30} />
              </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>Title</Text>
            <TextInput onChangeText={(title) => this.setState({title})}  value={this.state.title} placeholder="Enter Your Story Title" placeholderTextColor="grey"  style={styles.inputTitle} />
          </View>
          <View style={styles.inputTitle}>
            <View>
                <Text style={styles.text}>Upload Picture</Text>
                <View style={styles.uploadBtn} >
                    <TouchableHighlight
                      onPress={this.upload.bind(this)}
                      title="Upload"
                      style={styles.logoBtn}
                      ><Text style={styles.btnText}>Upload Picture</Text></TouchableHighlight>
                </View>
            </View>
            <Image source={this.state.pickedImage} style={styles.picture} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.text}> Content</Text>
            <TextInput onTouchStart={()=>  this.setState({'editor': 2})} value={this.state.text} placeholder="Enter Your Thoughts" placeholderTextColor="grey"  style={styles.inputTitle} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.text}> # Tag</Text>
            <TextInput onChangeText={(label) => this.setState({label})}  value={this.state.label} placeholder="Enter your #tag" placeholderTextColor="grey"  style={styles.inputTitle} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.text}>Theme</Text>
            <View style={{flexDirection: 'row', paddingLeft: 100}}>
              { this.state.theme === 1 ? <Image source={blackImg} style={[styles.theme,  styles.borderTheme]} /> :  
                <TouchableOpacity  onPress={() => {this.setState({theme: 1})}}> 
                  <Image source={blackImg} style={[styles.theme]}/> 
                </TouchableOpacity>}
              { this.state.theme === 2 ? <Image source={whiteImg} style={[styles.theme,  styles.borderTheme]} /> : 
                <TouchableOpacity  onPress={() => {this.setState({theme: 2})}}> 
                  <Image source={whiteImg} style={[styles.theme]}/> 
                </TouchableOpacity>}
            </View>
          </View>
        </View> }
        { this.state.editor === 2 &&  <View style={{ borderWidth: 1, borderColor: 'black'}}>
          <View style={styles.searchContainer}>
          
                <TouchableOpacity style={{width: '70%', marginLeft: 20}} onPress={() => { this.setState({editor: 1})}}>
                  <Icon name="md-checkmark" color="white" size={40} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={this._startRecognition}>
                  <Icon name="md-mic" color="white" size={25} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}> B </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white', fontFamily: 'monospace'}}> I </Text>
                </TouchableOpacity>
            </View>
            <View style={{height: '87%'}}>
              <TextInput
                multiline={true}
                numberOfLines={15}
                style={{fontSize: 25, textAlignVertical: "top"}}
                onChangeText={(text) => this.setState({text})}
                placeholder="Express Yourself" placeholderTextColor="grey"
                value={this.state.text}/>
            </View>
        </View> } 
        { this.state.editor === 3 && this.state.theme === 1 && <ImageBackground source={blackImg} style={styles.backImg}>
                                      <View style={{height: 30, backgroundColor: 'white'}}>
                                        <TouchableOpacity style={{paddingLeft: 20, paddingTop: 5}} onPress={() => {this.setState({'editor': 1})}}>
                                            <Icon name="md-arrow-round-back" color="black" size={20} />
                                        </TouchableOpacity>
                                      </View>
                                      <View style={{padding: 15}}>

                                        <Text style={styles.header}>{this.state.title}</Text>
                                          <Image source={this.state.pickedImage} style={styles.aboutPicture} />
                                          <View>                                  
                                              <Text style={styles.aboutText}>{'\t'} {'\t'} {'\t'} {'\t'}{'\t'} {this.state.text}</Text></View>
                                            </View>
                                            <View style={{ position: 'absolute', bottom: 30, left: 20, flexDirection: 'row', color: 'white' }}>
                                                <Icon name="ios-pricetag"  color="blue" size={20} />
                                                <Text style={{paddingLeft: 5, color: 'white'}}> #{this.state.label} </Text>        
                                            </View>
                                              <View style={{ position: 'absolute', bottom: 10, left: 20 }}>
                                                <Text style={{color: 'white'}}> Posted By - Abdullah Abbasi</Text>
                                              </View>  
                                        </ImageBackground>}
                { this.state.editor === 3 && this.state.theme === 2 && <ImageBackground source={whiteImg} style={styles.backImg}>
              <View style={{height: 30, backgroundColor: 'black'}}>
                <TouchableOpacity style={{paddingLeft: 20, paddingTop: 5}} onPress={() => {this.setState({'editor': 1})}}>
                    <Icon name="md-arrow-round-back" color="white" size={20} />
                </TouchableOpacity>
              </View>
              <View style={{padding: 15}}>

                <Text style={[styles.header, styles.blackColor]}>{this.state.title}</Text>
                  <Image source={this.state.pickedImage} style={styles.aboutPicture} />
                  <View>                                  
                      <Text style={[styles.aboutText, styles.blackColor]}>{'\t'} {'\t'} {'\t'} {'\t'}{'\t'} {this.state.text}</Text></View>
                    </View>
                  <View style={{ position: 'absolute', bottom: 30, left: 20, flexDirection: 'row' }}>
                      <Icon name="ios-pricetag"  color="blue" size={20} />
                      <Text style={{paddingLeft: 5}}> # {this.state.label} </Text>        
                  </View>
                    <View style={{ position: 'absolute', bottom: 10, left: 20 }}>
                      <Text> Posted By - Abdullah Abbasi</Text>
                    </View> 
                </ImageBackground>}                               
    </View>     
    )
  }
}

export  class Published extends  Component {
  constructor(props) {
    super(props)
    console.log('published ', props)
  }
  render() {
    
    return (<View>
      { this.props.screenProps.publishList.length > 0 && this.props.screenProps.publishList.map((blog, number) => {
        return (<View style={styles.listItem}>
                  <Text style={styles.title}>{blog.title}</Text>
                  <Text style={{'fontSize': 15, 'paddingLeft': 5, 'paddingBottom': 10}}> {blog.date} </Text>
                  <View style={styles.labelContainer}>
                      <Icon name="ios-pricetag"  color="blue" size={20} />
                      <Text style={{paddingLeft: 5}}> {blog.label} </Text>        
                  </View>
                </View>)

      } )
 
      }
      { this.props.screenProps.publishList.length === 0 &&  
        <View  style={{height: '87%', alignItems: 'center', textAlign: 'center', justifyContent:'center'}}>
          <Text> No Stories Avaiable </Text>  
        </View>}
        </View>);
  }
}

export  class Draft extends  Component {
  constructor(props) {
    super(props)
    console.log('published ', props)
  }
  render() {
    
    return (<View>
      { this.props.screenProps.draftList.length > 0 && this.props.screenProps.draftList.map((blog, number) => {
        return (<View style={styles.listItem}>
                  <Text style={styles.title}>{blog.title}</Text>
                  <Text style={{'fontSize': 15, 'paddingLeft': 5, 'paddingBottom': 5}}> {blog.time} </Text>
                  <View style={styles.labelContainer}>
                      <Icon name="ios-pricetag"  color="blue" size={20} />
                      <Text style={{paddingLeft: 5}}> {blog.label} </Text>        
                  </View>
                </View>)

      } )
 
      }
      { this.props.screenProps.draftList.length === 0 &&  
        <View  style={{height: '87%', alignItems: 'center', textAlign: 'center', justifyContent:'center'}}>
          <Text> No Stories Avaiable </Text>  
        </View>}
        </View>);
  }
}

export const Tabs = createTabNavigator({
  Published: {
    screen: props => { return <Published {...props}/>},
  }, 
  Draft: {
    screen: props =>  { return <Draft {...props}/>},
  }
}, {animationEnabled: true, tabBarOptions: {
  indicatorStyle:{backgroundColor: 'white'},
  activeTintColor: 'white',
  labelStyle: {
    fontSize: 14,
  },
  style: {
    backgroundColor: 'grey',
  },
}});

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  titleContainer: {
    height: '15%'
  },
  body: {
    height: '87%',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  text: {
    color: '#2542C7',
    fontSize: 15,
    padding: 7
  },
  inputTitle: {
    padding: 20,
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
    width: '60%',
    color: 'white',
    marginBottom: 2,
    fontSize: 25,
  },
  searchButton: {
    width: '20%'
  },
  productListContainer: {
    flex:1,
    backgroundColor: 'red'
  },
  blackColor : {
    color: 'black'
  },
  icon: {
    padding: 10,
    paddingRight: 20
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
theme: {
  width: 50,
  height: 50,
  marginLeft: 25,
  borderRadius:10,

},
borderTheme:{
  borderWidth: 1,
  borderColor: 'red'
},
uploadBtn: {
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
nextContainer : {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
},
listItem: {
  height: 130,
  flexDirection: 'column',
  backgroundColor: '#eee',
  marginBottom: 5,
  padding: 10,
  borderBottomWidth: 1,
  borderColor: '#D3D3D3'
},
title: {
  fontSize: 25,
  color: 'black',
  padding: 5
}, 
labelContainer: {
  height: 20,
  width: '100%',
  paddingLeft: 10,
  flexDirection: 'row'
},
header: {
  width: '100%',
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold',
  paddingBottom: 10,
  color: 'white'
},
aboutPicture: {
    height: 300,
    width: '100%',
},
aboutText :{
    paddingTop: 20,
    color: 'white',
    fontSize: 17,
    padding: 7,
    fontStyle: 'italic',
},
backImg : {
    width: '100%', 
    height: '100%',
}

})



export default Blog;
