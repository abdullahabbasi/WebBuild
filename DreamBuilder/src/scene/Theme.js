import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Button, TouchableHighlight, ImageBackground} from 'react-native'
import { singleScreenApplication } from '../styles/navigatorstyle'
import Icon from 'react-native-vector-icons/Ionicons'
//import ImagePicker from 'react-native-image-crop-picker'
import theme1 from '../assets/theme1.png'
import theme2 from '../assets/theme2.png'
import backgroundImg from '../assets/black.jpg'

class Theme extends Component {
    static navigatorStyle = singleScreenApplication;
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            pickedImage: null,
            headerColor: 'black',
            theme: 2
        }
    }

    publish() {
        fetch("https://build-buiz.firebaseio.com/theme.json", {
            method: "POST",
            body: JSON.stringify({'theme': this.state.theme})
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
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
    

    render() {
        //const images = this.state.pictures.map((image, id) => {return <Image style={{width: 100, height: 50,borderWidth: 1, borderColor: 'red'}} source={{uri: `data:image/png;base64,${image.data}`}}/>})
       return        <View style={styles.container}>
                       <View style={styles.searchContainer}>
                            <ImageBackground source={backgroundImg} style={styles.backImg}>
                                <Text style={styles.inputSearch}>Dream Builder</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.text}>Choose a theme</Text>
                        </View>
                        { this.state.theme === 2 ? <View style={[styles.itemContainer, styles.borderTheme]}>
        
                                        <TouchableOpacity> 
                                            <Image source={theme1}  style={{width: '100%', height: 200}}/> 
                                        </TouchableOpacity> 
                                {/* <Text style={styles.itemText}>Catalogue</Text> */}
 
                            <Text style={styles.itemText}>Theme 1</Text>
                        </View>:
                                <View style={[styles.itemContainer]}>
                                    <TouchableOpacity onPress={() => {this.setState({theme: 2}); this.publish()}}> 
                                                    <Image source={theme1} style={{width: '100%', height: 200}} />
                                                </TouchableOpacity>  
                                        {/* <Text style={styles.itemText}>Catalogue</Text> */}

                                    <Text style={styles.itemText}>Theme 1</Text>
                                </View>
                            }


                            { this.state.theme === 1 ? <View style={[styles.itemContainer, styles.borderTheme]}>
                                
                                            <TouchableOpacity> 
                                                <Image source={theme2}  style={{width: '100%', height: 200}}/> 
                                            </TouchableOpacity> 
                                    {/* <Text style={styles.itemText}>Catalogue</Text> */}

                                <Text style={styles.itemText}>Theme 2</Text>
                                </View> :
                                    <View style={[styles.itemContainer]}>
                                        <TouchableOpacity onPress={() => {this.setState({theme: 1}); this.publish();}}> 
                                                        <Image source={theme2} style={{width: '100%', height: 200}} />
                                                    </TouchableOpacity>  
                                            {/* <Text style={styles.itemText}>Catalogue</Text> */}

                                        <Text style={styles.itemText}>Theme 2</Text>
                                    </View>
                                }

                            

                        {/* <View style={{flexDirection: 'column'}}>
                            { this.state.theme === 1 ? <Image source={blackImg} style={[styles.theme,  styles.borderTheme]} /> :  
                                <TouchableOpacity  onPress={() => {this.setState({theme: 1})}}> 
                                    <Image source={blackImg} style={[styles.theme]}/> 
                                </TouchableOpacity>}
                            { this.state.theme === 2 ? <Image source={whiteImg} style={[styles.theme,  styles.borderTheme]} /> : 
                                <TouchableOpacity  onPress={() => {this.setState({theme: 2})}}> 
                                    <Image source={whiteImg} style={[styles.theme]}/> 
                                </TouchableOpacity>}
                            </View> */}
                    </View>
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    titleContainer: {
      height: '5%'
    },
    text: {
      color: '#2542C7',
      fontSize: 15,
      padding: 7
    },
    theme: {
      width: '80%',
      height: 100,
      borderRadius:2,
    
    },
    borderTheme:{
      borderWidth: 2,
      borderColor: 'red'
    },
    itemContainer: {
        flexWrap: 'wrap',
        width: '80%',
        margin: 20
    },
    itemText: {
        marginTop: 5,
        color: 'grey'
    },
    searchContainer :{
        height: '13%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    backImg : {
        width: '100%', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center'
    }
  })
  

  
export default Theme