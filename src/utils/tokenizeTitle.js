export function tokenizeTitle(title) {
  const stopwords = ['de', 'la', 'el', 'en', 'con', 'para', 'por', 'una', 'un', 'y', 'o', 'que'];
  return title
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 3 && !stopwords.includes(word))
    .slice(0, 6)
    .join(' ');
}