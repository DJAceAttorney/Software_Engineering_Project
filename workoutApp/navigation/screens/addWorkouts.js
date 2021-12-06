import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
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

                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={styles.textbox1}
                        onChangeText = {newName => 
                            setNewName(newName)
                        }
                        value = {newName}
                        placeholder = "Workout Name"
                        />

                    <TextInput
                        style={styles.textbox2}
                        onChangeText = {x => 
                            setNewExercise({...newExercise, name: x})
                        }
                        value = {newExercise.name}
                        placeholder = "Exercise Name"
                        />
                    </View>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={styles.textbox3}
                        onChangeText = {x => 
                            setNewExercise({...newExercise, reps: parseInt(x)})
                        }
                        keyboardType='numeric'
                        placeholder = "Reps"
                        />

                    <TextInput
                        style={styles.textbox4}
                        onChangeText = {x => 
                            setNewExercise({...newExercise, sets: parseInt(x)})
                        }
                        keyboardType='numeric'
                        placeholder = "Sets"
                        />

                    <TextInput
                        style={styles.textbox4}
                        onChangeText = {x => 
                            setNewExercise({...newExercise, weight: parseInt(x)})
                        }
                        keyboardType='numeric'
                        placeholder = "Weight (lbs)"
                    />
                    </View>
                        
                
                    <Button title = "Add Workout" onPress = {() => {
                        
                        setNewExercise({...newExercise, id: uuid.v4()})
                        setExerciseList([...exercisesList, newExercise])
                        
                        }}/>

                    <FlatList 

                        keyExtractor={(item) => item.id}
                        data={exercisesList}
                        renderItem={({ item }) => (
                            <Card containerStyle={styles.exerciseContainer}>
                                <Card.Title><Text>{item.name}</Text></Card.Title>
                                <Text>Exercise: {item.name} Reps: {item.reps} Sets: {item.sets} Weight: {item.weight}</Text>
                                    <Button buttonStyle={styles.delete} title = "Delete" onPress = {() => removeItem(item.id)}/>
                                </Card>

                        )}
                        extraData = {isRender}
                    
                    />

                   <Button title = "Save Workout" onPress = {createWorkout}/>
                    
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

    textbox1: {
        backgroundColor: 'white',
        width: 160,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-start'
    },

    textbox2: {
        backgroundColor: 'white',
        width: 160,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-end'
    },

    textbox3: {
        backgroundColor: 'white',
        width: 105,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-start'
    },

    textbox4: {
        backgroundColor: 'white',
        width: 106,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-end'
    },


    exerciseContainer: {
        backgroundColor: 'white',
        width: 300,
        minHeight: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        margin: 2,
    },

    delete: {
        color: 'white',
        width: 100,
        height: 30,
    },
});