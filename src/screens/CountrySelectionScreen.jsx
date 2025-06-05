import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { usePreferences } from '../context/PreferencesContext';

const COUNTRIES = [
  { code: 'ae', name: 'Emiratos Árabes' },
  { code: 'ar', name: 'Argentina' },
  { code: 'at', name: 'Austria' },
  { code: 'au', name: 'Australia' },
  { code: 'be', name: 'Bélgica' },
  { code: 'bg', name: 'Bulgaria' },
  { code: 'br', name: 'Brasil' },
  { code: 'ca', name: 'Canadá' },
  { code: 'ch', name: 'Suiza' },
  { code: 'cn', name: 'China' },
  { code: 'co', name: 'Colombia' },
  { code: 'cu', name: 'Cuba' },
  { code: 'cz', name: 'Chequia' },
  { code: 'de', name: 'Alemania' },
  { code: 'eg', name: 'Egipto' },
  { code: 'fr', name: 'Francia' },
  { code: 'gb', name: 'Reino Unido' },
  { code: 'gr', name: 'Grecia' },
  { code: 'hk', name: 'Hong Kong' },
  { code: 'hu', name: 'Hungría' },
  { code: 'id', name: 'Indonesia' },
  { code: 'ie', name: 'Irlanda' },
  { code: 'il', name: 'Israel' },
  { code: 'in', name: 'India' },
  { code: 'it', name: 'Italia' },
  { code: 'jp', name: 'Japón' },
  { code: 'kr', name: 'Corea del Sur' },
  { code: 'lt', name: 'Lituania' },
  { code: 'lv', name: 'Letonia' },
  { code: 'ma', name: 'Marruecos' },
  { code: 'mx', name: 'México' },
  { code: 'my', name: 'Malasia' },
  { code: 'ng', name: 'Nigeria' },
  { code: 'nl', name: 'Países Bajos' },
  { code: 'no', name: 'Noruega' },
  { code: 'nz', name: 'Nueva Zelanda' },
  { code: 'ph', name: 'Filipinas' },
  { code: 'pl', name: 'Polonia' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ro', name: 'Rumania' },
  { code: 'rs', name: 'Serbia' },
  { code: 'ru', name: 'Rusia' },
  { code: 'sa', name: 'Arabia Saudita' },
  { code: 'se', name: 'Suecia' },
  { code: 'sg', name: 'Singapur' },
  { code: 'si', name: 'Eslovenia' },
  { code: 'sk', name: 'Eslovaquia' },
  { code: 'th', name: 'Tailandia' },
  { code: 'tr', name: 'Turquía' },
  { code: 'tw', name: 'Taiwán' },
  { code: 'ua', name: 'Ucrania' },
  { code: 'us', name: 'Estados Unidos' },
  { code: 've', name: 'Venezuela' },
  { code: 'za', name: 'Sudáfrica' },
];

export const CountrySelectionScreen = ({ navigation }) => {
  const { preferences, updateCountry } = usePreferences();

  const handleSelect = (code) => {
    updateCountry(code);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Seleccionar país</Text>
      <FlatList
        data={COUNTRIES}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              preferences.countryCode === item.code && styles.selectedItem,
            ]}
            onPress={() => handleSelect(item.code)}
          >
            <Text style={styles.text}>{item.name}</Text>
            {preferences.countryCode === item.code && <Text style={styles.check}>✓</Text>}
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
