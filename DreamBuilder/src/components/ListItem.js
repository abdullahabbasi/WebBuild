import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image} from 'react-native';
import headphoneImg from '../assets/headphone.jpg'

const item = (props) => {
    return <View onPress={ props.onPressItem } style={styles.listItem}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.imgDesc}>
                    <Image source={props.image} style={styles.dpStyle} ></Image>
                    <Text style={styles.description}>{props.description}</Text>        
                </View>
        </View> 
}
export default item;

const styles = StyleSheet.create({
    listItem: {
        height: 200,
        flexDirection: 'column',
        backgroundColor: '#eee',
        marginBottom: 5,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#C0C0C0'
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 10,
        color: '#2542C7'
    },
    imgDesc: {
        flex: 1,
        flexDirection:'row'
    },
    dpStyle: {
        padding:10,
        width: 130,
        height: 130,
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'black'
    },
    description: {
        padding: 10,
        flex: 7
    }
  });
  