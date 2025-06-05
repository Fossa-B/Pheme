import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import { Entypo } from '@expo/vector-icons';


export const NewsCard = ({ article, onPress, onOptionsPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.source}>{article.source.name}</Text>
        <Text style={styles.title} numberOfLines={3}>{article.title}</Text>

        <View style={styles.footer}>
          <Text style={styles.time}>{formatRelativeTime(article.publishedAt)}</Text>
          <TouchableOpacity onPress={onOptionsPress}>
            <Entypo name="dots-three-vertical" size={16} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    height: 180,
    width: '100%',
  },
  content: {
    padding: 12,
  },
  source: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
});