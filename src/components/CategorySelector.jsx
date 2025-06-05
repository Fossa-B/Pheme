
import { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CATEGORIES = [
  'Para ti',
  'Titulares',
  'Internacional',
  'Negocios',
  'Ciencia y tecnología',
  'Entretenimiento',
  'Deportes',
  'Salud',
];



export const CategorySelector = ({ onCategorySelect }) => {
  const [selected, setSelected] = useState('Titulares');

  const handleSelect = (category) => {
    setSelected(category);
    onCategorySelect(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => handleSelect(cat)}
            style={[
              styles.category,
              selected === cat && styles.categorySelected
            ]}
          >
            <Text
              style={[
                styles.text,
                selected === cat && styles.textSelected
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  category: {
    backgroundColor: '#f0f0f0',
    marginHorizontal: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  categorySelected: {
    backgroundColor: '#0056D2',
  },
  text: {
    color: '#333',
    fontWeight: '500',
  },
  textSelected: {
    color: '#fff',
  },
});