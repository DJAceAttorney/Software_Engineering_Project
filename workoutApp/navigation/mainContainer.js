import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import workouts from './screens/workouts';
import addWorkouts from './screens/addWorkouts';
import exerciseList from './screens/exerciseList';

//Screen names
const workoutsName = "Workouts";
const addName = "Add/Edit Workout";
const exerciseName = "Exercises";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={workoutsName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            {/*Icons for navigation*/}

            {/*Icons list of workouts*/}
            if (rn === workoutsName) {
              iconName = focused ? 'barbell' : 'barbell-outline';

            {/*Icons for adding a workout*/}
            } else if (rn === addName) {
              iconName = focused ? 'add' : 'add-circle-outline';

            {/*Icons for exercise list*/}
            } else if (rn === exerciseName) {
              iconName = focused ? 'menu' : 'menu-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        {/* Different screens*/}
        <Tab.Screen name={workoutsName} component={workouts} />
        <Tab.Screen name={addName} component={addWorkouts} />
        <Tab.Screen name={exerciseName} component={exerciseList} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;