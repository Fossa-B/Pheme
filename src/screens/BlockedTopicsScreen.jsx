import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { usePreferences } from '../context/PreferencesContext';

export const BlockedTopicsScreen = ({navigation}) => {
  const { preferences, toggleBlockedTopic } = usePreferences();
  const { blockedTopics } = preferences;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
      <TouchableOpacity title="Desbloquear" onPress={() => toggleBlockedTopic(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      {blockedTopics.length === 0 ? (
        <Text style={styles.empty}>No hay temas bloqueados.</Text>
      ) : (
        <FlatList
          data={blockedTopics}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  text: { fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});