import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import CoverageScreen from '../screens/CoverageScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={TabNavigator}/>
      <Stack.Screen name="Detalle" component={NewsDetailScreen} />
      <Stack.Screen name="Cobertura" component={CoverageScreen} />
    </Stack.Navigator>
  );
}