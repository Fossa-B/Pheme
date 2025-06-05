
import Constants from 'expo-constants';

const BASE_URL = "https://newsapi.org/v2";
const NEWS_API_KEY = Constants.expoConfig.extra.NEWS_API_KEY;
const CATEGORY_QUERY_MAP = {
  "Internacional": "international",
  "Negocios": "business",
  "Tecnología": "technology",
  "Deportes": "sports",
  "Salud": "health",
  "Ciencia y tecnología": "science",
  "Entretenimiento": "entertainment"
};


export const fetchNews = async (category, preferences, page) => {
  const { language, blockedTopics = [], blockedDomains = [], countryCode } = preferences;
  const pageSize = 20;

  const isTitulares = category === "Titulares";
  const isParaTi = category === "Para ti";

  let url = "";
  const params = new URLSearchParams();

  if (isTitulares) {
    url = `${BASE_URL}/top-headlines`;
    params.set("country", countryCode);
  } else {
    url = `${BASE_URL}/everything`;
    params.set("sortBy", "publishedAt");
    if (language) params.set("language", language);
  }


  if (!isTitulares && !isParaTi && CATEGORY_QUERY_MAP[category]) {
    params.set("q", CATEGORY_QUERY_MAP[category]);
  }

 
  if (isParaTi) {
  const positiveQuery = "news";
  const negativeQuery = blockedTopics.length > 0
    ? blockedTopics.map(topic => `-${topic}`).join(" ")
    : "";

  const q = `${positiveQuery} ${negativeQuery}`.trim();
  params.set("q", q);
}

  
  if (blockedDomains.length) {
    params.set("excludeDomains", blockedDomains.join(","));
  }

  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());

  const finalUrl = `${url}?${params.toString()}`;

  console.log("Fetching from URL:", finalUrl);
  console.log("Headers:", {
    "X-Api-Key": NEWS_API_KEY,
  });
  console.log("Preferences recibidas:", preferences);

  const response = await fetch(finalUrl, {
    headers: {
      "X-Api-Key": NEWS_API_KEY,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Respuesta no OK:", response.status, errorBody);
    throw new Error("Error al obtener noticias");
  }

  const data = await response.json();
  console.log("Data recibida:", data);

  return {
    articles: data.articles,
    totalResults: data.totalResults,
  };
};