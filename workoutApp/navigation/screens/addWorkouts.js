import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';


export default function addWorkouts({ navigation }) {

    //var for getting workout name
    const [newName, setNewName] = useState("");

    //holds exercises
    const [exercisesList, setExerciseList] = useState([]);
    const [isRender, setisRender] = useState(false);

    //exercise object, includes name, reps, sets, weight
    const [newExercise, setNewExercise] = useState({name: '', reps: 0, sets: 0, weight: 0, id: uuid.v4()});

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
        await addDoc(workoutsCollectionRef, {name: newName, exercises: exercisesList})

    }

    //remove from exercise list
    function removeItem(id) {

        const removedFromList = exercisesList.filter((exercise) => exercise.id !== id);
        setExerciseList(removedFromList);
        
    }

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
                        
                
                    <Button title = "Add Workout" onPress = {() => {
                        
                        setNewExercise({...newExercise, id: uuid.v4()})
                        setExerciseList([...exercisesList, newExercise])
                        
                        }}/>

                    <FlatList 

                        keyExtractor = {(item) => item.id}
                        data = {exercisesList}
                        renderItem = {({item}) => (

                            <View>

                                <Text>Exercise: {item.name} Reps: {item.reps} Sets: {item.sets} Weight: {item.weight}</Text>
                                <Button title = "Delete" onPress = {() => removeItem(item.id)}/>
                            
                            </View>

                        )}
                        extraData = {isRender}
                    
                    />

                   <Button title = "Save Workout" onPress = {createWorkout}/>
                    

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