import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';


export default function addWorkouts({ navigation, route}) {

    //var for getting workout name
    const [newName, setNewName] = useState("");

    //holds exercises
    const [exercisesList, setExerciseList] = useState([]);
    const [isRender, setisRender] = useState(false);

    //exercise object, includes name, reps, sets, weight
    const [newExercise, setNewExercise] = useState({name: '', reps: '', sets: '', weight: '', id: uuid.v4()});

    //drop-down variables
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);

    //db reference to workouts table
    const workoutsCollectionRef = collection(db, "workouts");
    
   //exercises holds db []
    const [exercises, setExercises] = useState([]);

    //call to exercrises table in db
    const exercisesCollectionRef = collection(db, "exercises");

    useEffect (() => {

        //getDoc sets exercises from the database with time to avoid dropdown issues
        const timer = setTimeout(()=> {
            const getExercises = async () => {

                const data = await getDocs(exercisesCollectionRef);
                setExercises(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                
            }

            getExercises();
        }, 200);
        return () => clearTimeout(timer);

    }, [open])
    
    const createWorkout = async () => {

        //adds workout with a name and a list with an exercise object (may start with an empty list and add objects to list separately with function addWorkoutExer())
        await addDoc(workoutsCollectionRef, {name: newName, exercises: exercisesList})
        setNewName('')
        setExerciseList([])

    }
    
    function removeItem(id) {

        //remove from exercise list
        const removedFromList = exercisesList.filter((exercise) => exercise.id !== id);
        setExerciseList(removedFromList);
        
    }

    //renderItems for displaying exercise list
    const renderItem = ({ item }) => (
        <Card key = {item.id} containerStyle={styles.exerciseContainer}>
            <Card.Title><Text>{item.name}</Text></Card.Title>
            <Text>Reps: {item.reps} Sets: {item.sets} Weight: {item.weight}</Text>
                <Button buttonStyle={styles.delete} title = "Delete" onPress = {() => removeItem(item.id)}/>
        </Card>

    );

    return (
        
        //Dissmisses keyboard when clicking off keyboard
        <TouchableWithoutFeedback onPress = { () => {

            Keyboard.dismiss();

            }}>
            <View style={styles.container}>
                
                <View style={{ flexDirection: "row" }}>

                    {/*Get Workout Name*/}
                    <TextInput
                        style={styles.textbox1}
                        onChangeText = {newName => 
                            setNewName(newName)
                        }
                        value = {newName}
                        placeholder = "Workout Name"
                    />

                    {/*Get Exercise Name*/}
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

                    {/*Get Exercise Reps*/}
                    <TextInput
                        style={styles.textbox3}
                        onChangeText = {x => 
                            {   
                                if (x.length === 0){
                                    setNewExercise({...newExercise, reps: ''})
                                }
                                else {
                                    setNewExercise({...newExercise, reps: parseInt(x)})
                                }
                            }
                        }
                        value = {newExercise.reps.toString()}
                        keyboardType='numeric'
                        placeholder = "Reps"
                    />

                    {/*Get Exercise Sets*/}
                    <TextInput
                        style={styles.textbox4}
                        onChangeText = {x => 
                            {   
                                if (x.length === 0){
                                    setNewExercise({...newExercise, sets: ''})
                                }
                                else {
                                    setNewExercise({...newExercise, sets: parseInt(x)})
                                }
                            }
                        }
                        value = {newExercise.sets.toString()}
                        keyboardType='numeric'
                        placeholder = "Sets"
                    />

                    {/*Get Exercise Reps*/}
                    <TextInput
                        style={styles.textbox4}
                        onChangeText = {x => 
                            {   
                                if (x.length === 0){
                                    setNewExercise({...newExercise, weight: ''})
                                }
                                else {
                                    setNewExercise({...newExercise, weight: parseInt(x)})
                                }
                            }
                        }
                        value = {newExercise.weight.toString()}
                        keyboardType='numeric'
                        placeholder = "Weight (lbs)"
                    />

                </View>


                <DropDownPicker 

                    loading = {loading}

                    schema={{

                        label: 'name',
                        value: 'name',
                        id: 'id'
                    }}
                        
                    open = {open}
                    items = {exercises}
                    value = {value}
                    setOpen = {setOpen}
                    setValue = {setValue}
                    setItems = {setExercises}
                    autoScroll={true}
                    itemKey= "id"
                    placeholder = "Choose an exercise.."
                    dropDownDirection="BOTTOM"
                    searchable={true}
                    itemSeparator={true}
                    closeAfterSelecting={true}


                    style = {{
                        alignSelf: 'center',
                        width: 300,
                        margin: 10,
                    }}

                    containerStyle={{
                        width: 300,
                        margin: 10,
                      }}

                    onChangeValue = {() => {setNewExercise({...newExercise, name: value})}}
                />
                
                {/*Adds workout to exercist list and resets values*/}
                <Button title = "Add Workout" onPress = {() => {
                    
                    setNewExercise({...newExercise, id: uuid.v4()})
                    setExerciseList([...exercisesList, newExercise])
                    setNewExercise({name: '', reps: '', sets: '', weight: '', id: uuid.v4()})
                    
                    }}
                />

                {/*Displays list of exercises*/}
                <FlatList

                    keyExtractor={(item) => item.id}
                    data={exercisesList}
                    renderItem={renderItem}
                    extraData = {isRender}
                
                />

                {/*add a new workout documentation to database*/}
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