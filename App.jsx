import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator';
import { PreferencesProvider } from './src/context/PreferencesContext';
import { BookmarksProvider } from './src/context/BookmarksContext';

export default function App() {
  return (
    <PreferencesProvider>
      <BookmarksProvider>
         <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
      </BookmarksProvider>
    </PreferencesProvider>
  );
}