import 'dotenv/config';

export default {
  expo: {
    name: "tu-app",
    slug: "tu-app",
    version: "1.0.0",
    extra: {
      NEWS_API_KEY: process.env.NEWS_API_KEY,
    },
  },
};