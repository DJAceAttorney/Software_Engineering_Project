import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-ico-material-design';

var iconHeight = 26;
var iconWidth = 26;

export default class App extends React.Component{
  state = {
    screenText: "Press a button"
  }

  changeText = (text) => {
    console.log(text + ' has been pressed!')
    this.setState({
      screenText: text
    })
  }

  render(){
    return (
      <View style={styles.container}>
        
        {/*Handles text to show based on which screen you're on */}
        <View>
          <Text style ={{fontSize:30, color:'white'}}>{this.state.screenText}</Text>
          <StatusBar style="light" />
      
        </View>
      
        {/*Navigation menu*/}
        <View style={styles.NavContainer}>
          <View style={styles.Navbar}>

          {/*Navigation for list of workouts*/}
            <Pressable onPress={() => this.changeText('List of workouts')} style ={styles.IconBehave}
            android_ripple={{borderless:true, radius:50}}>
              <Icon name ="burn-button" height ={iconHeight} width={iconWidth} color='#448aff'/>

            </Pressable>

          {/*Navigation for creating a workout*/}
            <Pressable onPress={() => this.changeText('Make a workout')} style ={styles.IconBehave}
            android_ripple={{borderless:true, radius:50}}>
              <Icon name ="circumference" height ={iconHeight} width={iconWidth} color='#448aff'/>

            </Pressable>

          {/*Navigation for list of exercises*/}
            <Pressable onPress={() => this.changeText('List of exercises')} style ={styles.IconBehave}
            android_ripple={{borderless:true, radius:50}}>
              <Icon name ="photo-frame" height ={iconHeight} width={iconWidth} color='#448aff'/>

            </Pressable>

          </View>

        </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3962ff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  NavContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
  },

  Navbar: {
    flexDirection:'row',
    backgroundColor:'#eee',
    width:'90%',
    justifyContent: 'space-evenly',
    borderRadius: 40
  },

  IconBehave: {
    padding: 14
  }

});
