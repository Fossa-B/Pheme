import { useBookmarks } from '../context/BookmarksContext';
import { FlatList, View, Text } from 'react-native';
import { NewsCard } from '../components/NewsCard';

const BookmarkScreen = ({ navigation }) => {
  const { bookmarks } = useBookmarks();

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {bookmarks.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>No tienes noticias guardadas.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate('Detalle', { article: item })}
              onOptionsPress={() => {}}
            />
          )}
        />
      )}
    </View>
  );
};

export default BookmarkScreen