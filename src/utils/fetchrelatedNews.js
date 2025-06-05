
import Constants from 'expo-constants';
import { tokenizeTitle } from './tokenizeTitle';

const NEWS_API_KEY = Constants.expoConfig.extra.NEWS_API_KEY;


export async function fetchRelatedNews(title, originalUrl) {
  const query = tokenizeTitle(title);
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);
  const from = fromDate.toISOString().split('T')[0];

  const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=relevancy`;

  try {
    const response = await fetch(url,{
    headers: {
      'X-Api-Key': NEWS_API_KEY
    },});
    const data = await response.json();
    return data.articles.filter(
      article => article.url !== originalUrl // filtra la original
    );;
  } catch (error) {
    console.error('Error fetching related news:', error);
    return [];
  }
}