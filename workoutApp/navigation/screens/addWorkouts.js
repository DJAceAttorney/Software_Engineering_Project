import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { TextInput, Button } from 'react-native';

export default function addWorkouts({ navigation }) {

    
    //var for getting data
    const [newName, setNewName] = useState("");
    const [newExercise, setNewExercise] = useState("");
    const [newReps, setNewReps] = useState("");
    const [newSets, setNewSets] = useState("");
    const [newWeights, setNewWeights] = useState("");

    //db reference to workouts table
    const workoutsCollectionRef = collection(db, "workouts");
    
    const createWorkout = async () => {

        await addDoc(workoutsCollectionRef, {name: newName, exercises: newExercise, reps: newReps, sets: newSets, weight: newWeights})

    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    onPress={() => navigation.navigate('Workouts')}
                    style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>Add workout screen</Text>
            

            
                <TextInput
                    onChangeText = {newName => 
                        setNewName(newName)
                    }
                    value = {newName}
                    placeholder = "Enter a Workout Name"
                    />

                <TextInput
                    onChangeText = {newExercise => 
                        setNewExercise(newExercise)
                    }
                    value = {newExercise}
                    placeholder = "Enter a exercise"
                    />

                <TextInput
                    onChangeText = {newReps => 
                        setNewReps(newReps)
                    }
                    value = {newReps}
                    placeholder = "Enter reps"
                    />

                <TextInput
                    onChangeText = {newSets => 
                        setNewSets(newSets)
                    }
                    value = {newSets}
                    placeholder = "Enter sets"
                    />

                <TextInput
                    onChangeText = {newWeights => 
                        setNewWeights(newWeights)
                    }
                    value = {newWeights}
                    placeholder = "Enter a weight (lbs)"
                    />
                
                <Button title = "Add a workout" onPress = {createWorkout}/>
                
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
});