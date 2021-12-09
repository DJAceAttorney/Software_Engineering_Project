import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, Button} from 'react-native-elements';
import { db } from '../../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function workout({ navigation }) {

    //workouts holds db []
    const [workouts, setWorkouts] = useState([]);

    //call to workouts table in db
    const workoutsCollectionRef = collection(db, "workouts");

    useEffect (() => {

        //getDoc sets workouts from the database
        const getWorkouts = async () => {

            const data = await getDocs(workoutsCollectionRef);
            setWorkouts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))

        }

        getWorkouts()

    })

    const deleteWorkoutData = async(id) => {
        
        //deletes execerise for exercerises table
        await deleteDoc(doc(db, "workouts", id))

    }
    
    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView>

                    {workouts.map((workout => {
                        return (
                            <Card key = {workout.id} containerStyle={styles.shadowContainer}>
                                <Card.Title>
                                    <Text key={workout.id}>{workout.name}</Text>
                                </Card.Title>

                                
                                    {workout.exercises.map ((exercise => {

                                        return (

                                            <View key = {exercise.id}>
                                                <Text>{exercise.name}</Text>
                                                <Text>Sets: {exercise.sets} Reps: {exercise.reps} Weight: {exercise.weight}</Text>
                                            </View>

                                        );

                                    }))}

                                    <Button onPress={() => deleteWorkoutData(workout.id)} title="Delete" buttonStyle={styles.delete} titleStyle = {styles.buttonText}/>
                                
                            </Card>

                        );
                    }))}

                </ScrollView>

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

    workoutContainer: {
        backgroundColor: 'white',
        width: 300,
        minHeight: 50,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        padding: 3,
        margin: 2,
    },

    shadowContainer: {
        display: "flex",
        width: 300,
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

    delete: {
        color: 'white',
        backgroundColor: 'red',
        width: 100,
        height: 30,
    },

    buttonText: {
        fontSize: 10,
    }



});