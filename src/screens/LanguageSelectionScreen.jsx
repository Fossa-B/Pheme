
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { usePreferences } from '../context/PreferencesContext';


const LANGUAGES = [
  { code: 'ar', name: 'Árabe' },
  { code: 'de', name: 'Alemán' },
  { code: 'en', name: 'Inglés' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Francés' },
  { code: 'he', name: 'Hebreo' },
  { code: 'it', name: 'Italiano' },
  { code: 'nl', name: 'Holandés' },
  { code: 'no', name: 'Noruego' },
  { code: 'pt', name: 'Portugués' },
  { code: 'ru', name: 'Ruso' },
  { code: 'sv', name: 'Sueco' },
  { code: 'zh', name: 'Chino' },
];

export const LanguageSelectionScreen = ({ navigation }) => {
  const { preferences, updateLanguage } = usePreferences();

  const handleSelect = (code) => {
    updateLanguage(code);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Seleccionar idioma</Text>
      <FlatList
        data={LANGUAGES}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              preferences.language === item.code && styles.selectedItem,
            ]}
            onPress={() => handleSelect(item.code)}
          >
            <Text style={styles.text}>{item.name}</Text>
            {preferences.language === item.code && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    paddingBottom: 20,
    marginBottom: 20,
  },
  item: {
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedItem: {
    backgroundColor: '#f0f8ff',
  },
  text: {
    fontSize: 16,
  },
  check: {
    fontSize: 18,
    color: 'green',
  },
});