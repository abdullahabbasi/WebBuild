import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Actions as RouteActions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FitImage from 'react-native-fit-image'


class WelcomeContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <ScrollView>
        <View style={styles.itemSection}>
        <View  style={styles.dpSection}>
          <TouchableOpacity
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:100,
                height:100,
                borderRadius:100,
                overflow: 'hidden',
              }}
            >
            <Image source={require('../assets/spiderman.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.descSection}><Text > description </Text></View>
        <View style={styles.settingsSection}><Text> settings </Text></View>
        
      </View>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row'
  },
  dpSection: {
  },
  
  img: {
      borderRadius: 5,
      width: 10,
      height: 10,
  },
  dpContainer : {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descSection : {
    backgroundColor: 'green',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'lightgrey'
  },
  settingsSection: {
    backgroundColor: 'blue',
  },
  itemSection : {
    flex: 1,
    flexDirection: 'row'
  },
  imgCircle: {
    
  }
})

export default connect(null, null)(WelcomeContainer);
