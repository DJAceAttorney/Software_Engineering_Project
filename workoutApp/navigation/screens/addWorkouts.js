import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function addWorkouts({ navigation }) {

    //var for getting workout name
    const [newName, setNewName] = useState("");

    //exercise object, includes name, reps, sets, weight
    const [newExercise, setNewExercise] = useState({name: '', reps: 0, sets: 0, weight: 0});

    //const [newReps, setNewReps] = useState([]);
    //const [newSets, setNewSets] = useState([]);
    //const [newWeights, setNewWeights] = useState([]);

    //db reference to workouts table
    const workoutsCollectionRef = collection(db, "workouts");

    //workouts holds db []
    const [workouts, setWorkouts] = useState([]);


    useEffect (() => {

        //getDoc sets workouts from the database
        const getWorkouts = async () => {

            const data = await getDocs(workoutsCollectionRef);
            setWorkouts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))

        }

        getWorkouts()

    })
    
    const createWorkout = async () => {

        //adds workout with a name and a list with an exercise object (may start with an empty list and add objects to list separately with function addWorkoutExer())
        await addDoc(workoutsCollectionRef, {name: newName, exercises: [newExercise]})

    }

    /*

    //function to delete workout
    const deleteWorkout = async () => {



    }

    //function to update/add an exercise object to list of exercises given a workout
    const addWorkoutExercise = async () => {



    }
    
    //function to update/delete an exercise object from list of exercises
    const deleteWorkoutExercise = async () => {



    }
    
    */

    return (

        <TouchableWithoutFeedback onPress = { () => {

            Keyboard.dismiss();

        }}>
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
                        onChangeText = {x => 
                            setNewExercise({...newExercise, name: x})
                        }
                        value = {newExercise.name}
                        placeholder = "Enter a exercise"
                        />

                    
                        
                    <TextInput
                        onChangeText = {x => 
                            setNewExercise({...newExercise, reps: parseInt(x)})
                        }
                        keyboardType='numeric'
                        placeholder = "Enter reps"
                        />

                    <TextInput
                        onChangeText = {x => 
                            setNewExercise({...newExercise, sets: parseInt(x)})
                        }
                        keyboardType='numeric'
                        placeholder = "Enter sets"
                        />

                    <TextInput
                        onChangeText = {x => 
                            setNewExercise({...newExercise, weight: parseInt(x)})
                        }
                        keyboardType='numeric'
                        placeholder = "Enter a weight (lbs)"
                        />
                        
                
                    
                    <Button title = "Add a workout" onPress = {createWorkout}/>
                    {/*<Button title = "Add to workout" onPress = {updateExercise()}/>*/}

                </View>
            </View>
        </TouchableWithoutFeedback>
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