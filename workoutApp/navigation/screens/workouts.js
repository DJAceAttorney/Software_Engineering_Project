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
            <View style={styles.buttonContainer}>{/*you can grab these from a JSON file or something*/}
                <WorkoutButton name="Warm-up" numExercise="5" time="11"/>
                <WorkoutButton name="Arm Day" numExercise="16" time="54"/>
                <WorkoutButton name="Chest Day" numExercise="13" time="47"/>
                <WorkoutButton name="Cardio" numExercise="10" time="54"/>
                <WorkoutButton name="General Calisthenics" numExercise="12" time="43"/>
                <WorkoutButton name="Cool down" numExercise="3" time="18"/>
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