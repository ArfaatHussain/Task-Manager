import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddTask from '../screens/AddTask';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompletedTasks from '../screens/CompletedTasks';
import {House,Check} from 'lucide-react-native'
import TaskList from '../screens/Home';
import SplashScreen from '../screens/Splash';
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Splash'
      screenOptions={{
        headerShown:false
      }}
       >
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='main' component={BottomTabNavigation} />
        <Stack.Screen name='AddTask' component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel:false
      }}
    >
      <Tab.Screen name="Home" component={HomeScreenNavigation} options={{
        
        tabBarIcon: ({ focused }) => focused? <House color={'orange'}  size={30} /> : <House size={30} color="#F5EFEF" />
        }} />
      <Tab.Screen name="Completed" component={CompletedTasks} options={{
        tabBarIcon: ({ focused }) => focused? <Check color={'orange'} size={35} /> : <Check size={35} color="#F5EFEF" />
      }} />
    </Tab.Navigator>
  )
}

const HomeScreenNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName="TaskList" screenOptions={{ headerShown: false }}
    >

      <Stack.Screen name="TaskList" component={TaskList} />
    </Stack.Navigator>

  )
}
export default AppNavigation;
