import * as React from 'react';
import { StyleSheet, View, Text , TouchableHighlight} from 'react-native';

export default function addWorkouts({ navigation }) {
    var [ isPress, setIsPress ] = React.useState(false);

    var touchProps = {
        activeOpacity: 1,
        underlayColor: '#BBB',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
        style: isPress ? styles.buttonPress : styles.button, // <-- but you can still apply other style changes
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => console.log(''),                 // <-- "onPress" is apparently required
      };

    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <TouchableHighlight {...touchProps}>
               <Text style={{textAlign: "center", fontSize: 22}} >
                   Add New Workout
                </Text> 
                </TouchableHighlight>
                <TouchableHighlight {...touchProps}>
                <Text style={{textAlign: "center", fontSize: 22}}>
                   Edit Existing Workout
                </Text>
                </TouchableHighlight> 
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5fa4ea',
      alignItems: 'center',
      flexDirection: "column",
      justifyContent: 'flex-start',
      height: "100%"
    },
    button: {
        backgroundColor: "white",
        textAlign: 'center',
        fontSize: 20,
        padding: 20,
        width: 300,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonPress: {
        backgroundColor: "white",
        textAlign: 'center',
        fontSize: 20,
        padding: 20,
        width: 300,
        borderRadius: 5,
        marginVertical: 10,
    }
});