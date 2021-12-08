import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
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
                <ScrollView>
               
                    {exercises.filter(checkUserMade => checkUserMade.user == false).map ((exercise) => { //lists non-usermade exercerises

                        return (
                            <Card key={exercise.id} containerStyle={styles.shadowContainer}>
                                <Card.Title><Text>{exercise.name}</Text></Card.Title>
                                    <Text>Description: {exercise.desc}</Text>

                                </Card>
                        );
                        
                    })}


                    {exercises.filter(checkUserMade => checkUserMade.user == true).map ((exercise) => { //lists usermade exercerises with delete button

                        return (
                            <Card key={exercise.id} containerStyle={styles.shadowContainer}>
                                <Card.Title><Text>{exercise.name}</Text></Card.Title>
                                <Text>Description: {exercise.desc}</Text>
                                    <Button onPress={() => deleteExerciseData(exercise.id)} title="Delete"
                                        buttonStyle={styles.delete}/>
                                </Card>

                        );

                    })}

                </ScrollView>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={styles.textbox1}
                        onChangeText={newName =>
                            setNewExerciseName(newName)
                        }
                        value={newExerciseName}
                        placeholder="Exercise Name" />
                        
                    <TextInput
                                style = {styles.textbox2}
                                onChangeText = {newDesc => 
                                setNewDescription(newDesc)
                                }
                                value = {newDescription}
                            placeholder="Description" />
                </View>

                <Button style = {{margin: 10}} title = "Add new exercise" onPress = {addExerciseData}/> 
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    textbox1: {
        backgroundColor: 'white',
        width: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-start'
    },

    textbox2: {
        backgroundColor: 'white',
        width: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-end'
    },

    container: {
        flex: 1,
        backgroundColor: '#5fa4ea',
        alignItems: 'center',
        justifyContent: 'center',
    },

    delete: {
        color: 'white',
        width: 70,
        height: 30,
        alignSelf: "flex-end",
    },

    exerciseContainer: {
        backgroundColor: 'white',
        width: 300,
        minHeight: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        margin: 4,
    },

    shadowContainer: {
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
});
