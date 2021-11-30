import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const WorkoutButton = (props) => {//going to use props to take in the object data of the exercise
    return (
        <View style={styles.container}>
                <Text
                    style={{ color: '#000', fontSize: 26, fontWeight: 'bold'}}>Warm Up</Text>
                <Text
                    style={{ color: '#000', fontSize: 18, fontWeight: 'normal'}}>5 exercises</Text>
                <Text
                    style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>11 min </Text>
        </View>
    );
}

export default WorkoutButton;


const styles = StyleSheet.create({
    container: {
      display: "flex",
      width: 300,
      height: 100,
      flexDirection: "column",
      backgroundColor: 'white',
      marginVertical: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 10,
      borderRadius: 7,
      shadowOffset: {height: 10, width: 10},
      shadowColor: '#000',
      shadowOpacity: 0.7,
      shadowRadius: 5,
    },
},{
    children: {
    flex: 1,
    marginLeft: 40,
    }
});