import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PreferencesScreen } from '../screens/PreferencesScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { CountrySelectionScreen } from '../screens/CountrySelectionScreen';
import { BlockedSourcesScreen } from '../screens/BlockedSourcesScreen';
import { BlockedTopicsScreen } from '../screens/BlockedTopicsScreen';

const Stack = createNativeStackNavigator();

export default function PreferencesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Preferencias"
        component={PreferencesScreen}
      />
      <Stack.Screen
        name="Idioma"
        component={LanguageSelectionScreen}
      />
      <Stack.Screen
        name="País"
        component={CountrySelectionScreen}
      />
      <Stack.Screen
        name="Fuentes bloqueadas"
        component={BlockedSourcesScreen}
      />
      <Stack.Screen
        name="Temas bloqueados"
        component={BlockedTopicsScreen}
      />
    </Stack.Navigator>
  );
}