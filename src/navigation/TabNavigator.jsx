import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import PreferencesStackNavigator from './PreferencesStackNavigator'

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={BookmarkScreen} />
      <Tab.Screen name="Opciones" component={PreferencesStackNavigator} />
    </Tab.Navigator>
  );
}