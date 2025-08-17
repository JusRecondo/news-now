
const API_URL = process.env.LOCAL_API_URL

export const fetchNews = async ({ pageNum, selectedCategory }: { pageNum: number, selectedCategory: string }) => {
  try {       
    const response = await fetch(`${API_URL}/api/news/everything?page=${pageNum}&pageSize=12&q=${encodeURIComponent(selectedCategory)}&sortBy=publishedAt`)
    if (!response.ok) {
      return null
    }
    const json = await response.json();
    return json || null 
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Error fetching news: ' + e.message);
    } else {
      throw new Error('Error fetching news: ' + String(e));
    }
  }
}

export const fetchHeadlineNew = async () => {
  try { 
    const response = await fetch(`/api/news/top-headlines`)
    if (!response.ok) {
      return null
    }
    const json = await response.json();
    return json || null 
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Error fetching top story: ' + e.message);
    } else {
      throw new Error('Error fetching top story: ' + String(e));
    }
  }
}

export const searchNews = async ({ query, pageNum }: { query: string, pageNum: number}) => {
  if(query === '') return null;
  
  try {
    const response = await fetch(`${API_URL}/api/news/everything?page=${pageNum}&pageSize=12&q=${encodeURIComponent(query)}&sortBy=publishedAt`)
    if (!response.ok) {
      return null
    }
    const json = await response.json();
    return json || null
    
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Error searching news: ' + e.message);
    } else {
      throw new Error('Error searching news: ' + String(e));
    }
  }
}