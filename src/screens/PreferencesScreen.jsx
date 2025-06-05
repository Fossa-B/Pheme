import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePreferences } from '../context/PreferencesContext';
import { Feather } from '@expo/vector-icons';

export const PreferencesScreen = ({ navigation }) => {
  const { preferences } = usePreferences();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferencias</Text>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Idioma')}
      >
        <Text style={styles.label}>Idioma</Text>
        <Text style={styles.value}>{preferences.language}</Text>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('País')}
      >
        <Text style={styles.label}>País</Text>
        <Text style={styles.value}>{preferences.countryCode}</Text>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Temas bloqueados')}
      >
        <Text style={styles.label}>Temas bloqueados</Text>
        <Text style={styles.value}>{preferences.blockedTopics.length}</Text>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Fuentes bloqueadas')}
      >
        <Text style={styles.label}>Fuentes bloqueadas</Text>
        <Text style={styles.value}>{preferences.blockedDomains.length}</Text>
        <Feather name="chevron-right" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  value: {
    marginRight: 8,
    color: '#555',
  },
});