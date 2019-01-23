/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AddProduct from './src/scene/AddProduct'
import WelcomeScene from './src/scene/WelcomeScene'
import configureStore from './src/store/store'
import LandingPage from './src/scene/LandingPage'
import Starter from './src/scene/Starter'
import AboutUs from './src/scene/AboutUs'
import Contact from './src/scene/Contact'
import GalleryScene from './src/scene/GalleryScene'
import Blog from './src/scene/Blog'
import Theme from './src/scene/Theme'
import {
  createStackNavigator,
} from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Navigation = createStackNavigator({
  Starter: { screen: Starter },
  AddProduct: { screen: AddProduct },
  WelcomeScene: { screen: WelcomeScene },
  LandingPage: { screen: LandingPage },
  AboutUs: { screen: AboutUs },
  Contact: { screen: Contact },
  GalleryScene: { screen: GalleryScene },
  Blog: { screen: Blog },
  Theme: { screen: Theme }

} ,{ headerMode: 'none' });

type Props = {};
 class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}
export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
