import React, { useState, useEffect } from 'react';

interface Article {
  title: string;
  url: string;
  excerpt: string;
  thumbnail: string;
  date: string;
}

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true); 
  const [mounted, setMounted] = useState(false); 
 
  const getLast24HoursDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() - 1); 
    return date.toISOString().split('T')[0]; 
  };

  
  const fetchNews = async () => {
    const last24HoursDate = getLast24HoursDate();
    const url = `https://news-api14.p.rapidapi.com/v2/trendings?date=${last24HoursDate}&topic=Tennis&language=en&limit=10`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key':  process.env.NEXT_PUBLIC_API_KEY || '',
        'x-rapidapi-host': 'news-api14.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json(); 

      const fetchedArticles = data.data.map((item: Article) => ({
        title: item.title,
        url: item.url,
        excerpt: item.excerpt,
        thumbnail: item.thumbnail,
        date: item.date,
      }));

      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    setMounted(true);
    fetchNews();
  }, []); 


  if (!mounted || loading) {
    return <p className="text-center text-gray-500">Loading news...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div key={index} className="border border-gray-500 p-4 mb-4 rounded-xl flex">
            <div className='w-1/6 h-auto'>
              {article.thumbnail && (
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-auto mt-2 rounded-md"
                />
              )}
            </div>
            <div className='w-5/6 h-auto'>
              <h3 className="text-xl font-bold mb-2 ml-2">{article.title}</h3>
              <p className="text-sm mb-2 ml-2">{article.excerpt}</p>
              <p className="text-xs text-gray-500 ml-2">
                {new Date(article.date).toLocaleDateString()}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 ml-2"
              >
                Read more
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No articles found.</p>
      )}
    </div>
  );
};

export default NewsFeed;
