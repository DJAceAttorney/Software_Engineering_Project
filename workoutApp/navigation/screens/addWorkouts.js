import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function addWorkouts({ navigation }) {
    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    onPress={() => navigation.navigate('Workouts')}
                    style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>Add workout screen</Text>
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