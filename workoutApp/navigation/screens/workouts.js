import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, ListItem, Icon, Button} from 'react-native-elements';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

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
    
    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
                <Text
                    onPress={() => alert('This is the "Workout" screen.')}
                    style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>Workout Screen</Text>

                <Text>List of Workouts</Text>
                {workouts.map((workout => {
                    return (
                        <Card containerStyle={styles.workoutContainer}>
                        <Card.Title>
                                <Text key={workout.id}> {workout.name} </Text>
                            </Card.Title>
                            </Card>

                    );
                }))}

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

});