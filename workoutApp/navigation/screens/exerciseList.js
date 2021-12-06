import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default function exerciseList({ navigation }) {

    //hold custom made exercise names and descriptions
    const [newExerciseName, setNewExerciseName] = useState("");
    const [newDescription, setNewDescription] = useState("");

    //exercises holds db []
    const [exercises, setExercises] = useState([]);

    //call to exercrises table in db
    const exercisesCollectionRef = collection(db, "exercises");

    useEffect (() => {

        //getDoc sets exercises from the database
        const getExercises = async () => {

            const data = await getDocs(exercisesCollectionRef);
            setExercises(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))

        }

        getExercises();

    })

    const addExerciseData = async () => {

        //adds personal exercise to exercise data base user object indicated it was created by a user
        await addDoc(exercisesCollectionRef, {name: newExerciseName, desc: newDescription, user: true})
        setNewExerciseName("");
        setNewDescription("");

    }

    const deleteExerciseData = async(id) => {
        
        //deletes execerise for exercerises table
        await deleteDoc(doc(db, "exercises", id))

    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Text
                    onPress={() => navigation.navigate('Workouts')}
                    style={{ color: 'white', fontSize: 26, fontWeight: 'bold' , alignItems: 'center' , justifyContent: 'center' }}>Exercise List</Text> 
               
                {exercises.filter(checkUserMade => checkUserMade.user == false).map ((exercise) => { //lists non-usermade exercerises

                    return (
                        <Card key={exercise.id} containerStyle={styles.exerciseContainer}>
                            <Card.Title><Text>{exercise.name}</Text></Card.Title>
                            <View>
                                <Text>Description: {exercise.desc}</Text></View>

                            </Card>
                    );
                    
                })}


                {exercises.filter(checkUserMade => checkUserMade.user == true).map ((exercise) => { //lists usermade exercerises with delete button

                    return (
                        <Card key={exercise.id} containerStyle={styles.exerciseContainer}>
                            <View>
                                <Card.Title><Text>{exercise.name}</Text></Card.Title>
                            <Text>Description: {exercise.desc}</Text>
                                <Button onPress={() => deleteExerciseData(exercise.id)} title="Delete"
                                    buttonStyle={styles.delete}/>
                                </View>
                            </Card>

                    );

                })}
                    
                <TextInput
                        style = {styles.textbox}
                        onChangeText = {newName => 
                        setNewExerciseName(newName)
                        }
                        value = {newExerciseName}
                         placeholder = "Exercise Name"/>
                 <TextInput
                            style = {styles.textbox}
                            onChangeText = {newDesc => 
                            setNewDescription(newDesc)
                            }
                            value = {newDescription}
                            placeholder = "Description"/>

                <Button title = "Add new exercise" onPress = {addExerciseData}/> 

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    textbox: {
        backgroundColor: 'white',
        width: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },

    container: {
        flex: 1,
        backgroundColor: '#5fa4ea',
        alignItems: 'center',
        justifyContent: 'center',
    },

    delete: {
        color: 'white',
        width: 100,
    },

    exerciseContainer: {
        backgroundColor: 'white',
        width: 300,
        minHeight: 50,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        padding: 3,
        margin: 2,
    },
});
