export const searchNews = async ({ query, pageNum }: { query: string, pageNum: number}) => {
  if(query === '') return null;
  
  try {
    const response = await fetch(`/api/news/everything?page=${pageNum}&pageSize=12&q=${encodeURIComponent(query)}&sortBy=publishedAt`)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const json = await response.json();
    return json
    
  } catch (e) {
    throw new Error('Error buscando peliculas');
  }
}