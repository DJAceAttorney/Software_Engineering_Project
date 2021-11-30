import * as React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import WorkoutButton from '../components/button';

export default function workout({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={{width: "80%"}}>
            <Text
                style={styles.title}>Your Available Workouts</Text>
            </View>
            <View style={styles.buttonContainer}>
                <WorkoutButton/>
                <WorkoutButton/>
                <WorkoutButton/>
                <WorkoutButton/>
                <WorkoutButton/>
            </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    onPress={() => alert('This is the "Workout" screen.')}
                    style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>Not Workout Screen</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5fa4ea',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    title: {
        color: 'white', 
        marginVertical: 30,
        width: "100%",
        fontSize: 24, 
        fontWeight: 'bold' ,
        textAlign: "left",
    }
});