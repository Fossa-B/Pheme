
import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { CategorySelector } from '../components/CategorySelector';
import { fetchNews } from '../utils/fetchNews';
import { NewsCard } from '../components/NewsCard';
import { usePreferences } from '../context/PreferencesContext';


const HomeScreen = ({ navigation }) => {
  const { preferences } = usePreferences();
  const [selectedCategory, setSelectedCategory] = useState('Titulares');
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadNews = async (category, preferences, pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await fetchNews(category, preferences, pageNumber);
      const articles = res.articles
      if (pageNumber === 1) {
        setNews(articles);
      } else {
        setNews(prev => [...prev, ...articles]);
      }
      console.log('Noticias actuales:', articles.length)
      if (articles.length === 0) {
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadNews(selectedCategory,preferences, 1);
  }, [selectedCategory, preferences]);

 
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadNews(selectedCategory, preferences ,nextPage);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <CategorySelector onCategorySelect={setSelectedCategory} />

      {loading && page === 1 ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.url }
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate('Detalle', { article: item })}
              onOptionsPress={() => console.log('Opciones de la noticia')}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && page > 1 ? <ActivityIndicator size="small" style={{ margin: 10 }} /> : null
          }
        />
      )}
    </View>
  );
};

export default HomeScreen;