import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function exerciseList({ navigation }) {

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
    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    onPress={() => navigation.navigate('Workouts')}
                    style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>Exercise list screen</Text>

                {exercises.map ((exercise) => {

                    return (

                        <Text key = {exercise.id}>Name: {exercise.name} {"\n"} Description: {exercise.desc}</Text>

                    );

                })}

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