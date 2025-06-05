// screens/NewsDetailScreen.tsx
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import { useBookmarks } from '../context/BookmarksContext';
import { Entypo, Feather } from '@expo/vector-icons';


const NewsDetailScreen = ({ route , navigation }) => {
  const { article } = route.params
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(article.url);
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title} - ${article.url}`,
      });
    } catch (error) {
      console.log('Error al compartir:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {article.urlToImage && (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        )}
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.meta}>
          {article.source.name} · {formatRelativeTime(article.publishedAt)}
        </Text>
        <Text style={styles.description}>
          {article.content}
        </Text>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleShare}>
          <Feather name="share" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (bookmarked) removeBookmark(article.url);
          else addBookmark(article);
        }}>
          <Feather name={bookmarked ? "bookmark" : "bookmark"} color={bookmarked ? 'gold' : 'black'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cobertura', { article })}>
          <Entypo name="layers" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewsDetailScreen