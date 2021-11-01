import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function workout({ navigation }) {
    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    onPress={() => alert('This is the "Workout" screen.')}
                    style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>Workout Screen</Text>
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