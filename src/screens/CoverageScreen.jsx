/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { fetchRelatedNews } from '../utils/fetchrelatedNews';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import { Feather } from '@expo/vector-icons';



const CoverageScreen = ({route, navigation}) => {
  const { article } = route.params
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedNews = async () => {
      const result = await fetchRelatedNews(article.title, article.url);
      setRelatedArticles(result);
      setLoading(false);
    };

    loadRelatedNews();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Noticia original</Text>
        <View style={styles.card}>
          {article.urlToImage && (
            <Image source={{ uri: article.urlToImage }} style={styles.image} />
          )}
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.meta}>
            {article.source.name} · {formatRelativeTime(article.publishedAt)}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Cobertura en otros medios</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : relatedArticles.length === 0 ? (
          <Text>No se encontraron otras noticias relacionadas.</Text>
        ) : (
          relatedArticles.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              {item.urlToImage && (
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.source.name} · {formatRelativeTime(item.publishedAt)}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 20,
  },
  card: {
    marginBottom: 20,
  },
  image: {
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#666',
  },
});

export default CoverageScreen