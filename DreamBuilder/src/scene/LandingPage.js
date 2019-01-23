import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Button, Dimensions, ImageBackground} from 'react-native'
import { singleScreenApplication } from '../styles/navigatorstyle'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView  from 'react-native-maps'
import backgroundImg from '../assets/black.jpg'


class LandingPage extends Component {
    static navigatorStyle = singleScreenApplication;
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    pressTheme() {
        console.log('press clicked')
        this.props.navigation.navigate('Theme');
    }
    pressAddProduct() {
        console.log('press clicked')
        this.props.navigation.navigate('AddProduct');
    }
    pressContact() {
        this.props.navigation.navigate('Contact');
    }
    pressGallery() {
        this.props.navigation.navigate('GalleryScene');
    }
    pressCatalogue() {
        this.props.navigation.navigate('WelcomeScene')
    }
    pressAboutUs() {
        this.props.navigation.navigate('AboutUs')
    }
    pressBlog() {
        this.props.navigation.navigate('Blog')
    }
    
    render(){
          return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <ImageBackground source={backgroundImg} style={styles.backImg}>
                        <Text style={styles.inputSearch}>Dream Builder</Text>
                    </ImageBackground>
                </View>
                <View style={styles.MainContainer}>
                    <TextInput
                    placeholder="Search Card"
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}/>   
                </View>
              <ScrollView style={styles.list}>
                {/* <MapView 
                        initialRegion={this.state.focusedLocation}
                        style={styles.map}
                    /> */}
                <View style={styles.itemContainer}>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon} onPress={this.pressCatalogue.bind(this)}>
                                <Icon name="ios-list" color="#7e96de" size={50} />
                            </TouchableOpacity>
                            {/* <Text style={styles.itemText}>Catalogue</Text> */}
                        </View>
                        <Text style={styles.itemText}>Catalogue</Text>
                    </View>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon} onPress={this.pressAddProduct.bind(this)}>
                                <Icon name="ios-add" color="black" size={50} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemText}>Add Product</Text>
                    </View>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon} onPress={this.pressAboutUs.bind(this)}>
                                <Icon name="ios-people" color="#ff00bf" size={50} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemText}>About Us</Text>
                    </View>

                </View>
                <View style={styles.itemContainer}>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon}>
                                <Icon name="ios-card" color="#6CC4EE" size={50} />
                            </TouchableOpacity>
                            {/* <Text style={styles.itemText}>Catalogue</Text> */}
                        </View>
                        <Text style={styles.itemText}>Payment</Text>
                    </View>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon} onPress={this.pressGallery.bind(this)}>
                                <Icon name="md-apps" color="black" size={50} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemText}>Gallery</Text>
                    </View>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon} onPress={this.pressContact.bind(this)}>
                                <Icon name="md-contact" color="#0a5796" size={50} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemText}>Contact</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon}>
                                <Icon name="logo-facebook" color="#3B5998" size={50} />
                            </TouchableOpacity>
                            {/* <Text style={styles.itemText}>Catalogue</Text> */}
                        </View>
                        <Text style={styles.itemText}>Facebook</Text>
                    </View>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon}>
                                <Icon name="logo-twitter" color="#1DA1F2" size={50} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemText}>Twitter</Text>
                    </View>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon} onPress={this.pressTheme.bind(this)}>
                                <Icon name="ios-images" color="#C98882" size={50} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemText}>Themes</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon}>
                                <Icon name="ios-calendar" color="green" size={50} />
                            </TouchableOpacity>
                            {/* <Text style={styles.itemText}>Catalogue</Text> */}
                        </View>
                        <Text style={styles.itemText}>Appointment</Text>
                    </View>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon}>
                                <Icon name="ios-videocam" color="#c4302b" size={50} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemText}>Video</Text>
                    </View>
                    <View>
                        <View style={styles.item}>
                            <TouchableOpacity style={styles.icon} onPress={this.pressBlog.bind(this)}>
                                <Icon name="ios-megaphone" color="#444140" size={50} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemText}>Story</Text>
                    </View>
                </View>
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
        },
        backImg : {
            width: '100%', 
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            textAlign: 'center'
        },
        inputSearch: {
            width: '100%',
            color: 'white',
            marginBottom: 2,
            fontSize: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        },
        map: {
            width: '100%',
            height: 250
        },
        list: {

        },
        itemContainer: {
            height: 120,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row'
        },
        item:{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'grey'
            
        },
        icon: {
            flex: 1,
            padding: 7,
            alignItems: 'center',
            justifyContent: 'center'
          },
          itemText: {
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
              color: 'grey'
          },
          MainContainer :{
                height: '10%',
                justifyContent: 'center',
                margin: 10,
            },         
            
            TextInputStyleClass:{
                textAlign: 'center',
                height: 50,
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 20 ,
                backgroundColor : "#FFFFFF"
             
        }  
      })

  
export default LandingPage