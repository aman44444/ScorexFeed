import React, { useState, useEffect } from 'react';
import { soccerPlayers, cricketPlayers, tennisPlayers } from '../../player';

interface Article {
  title: string;
  excerpt: string;
}

const TrendingFeed: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [trendingSoccer, setTrendingSoccer] = useState<string[]>([]);
  const [trendingCricket, setTrendingCricket] = useState<string[]>([]);
  const [trendingTennis, setTrendingTennis] = useState<string[]>([]);

  const countMentions = (articles: Article[], playerList: string[]) => {
    const playerCount: { [key: string]: number } = {};

    articles.forEach((article) => {
      playerList.forEach((player) => {
        const playerRegex = new RegExp(player, 'gi');
        if (article.title.match(playerRegex) || article.excerpt.match(playerRegex)) {
          playerCount[player] = (playerCount[player] || 0) + 1;
        }
      });
    });

    const sortedPlayers = Object.entries(playerCount).sort((a, b) => b[1] - a[1]);

    return sortedPlayers.slice(0, 3).map((entry) => entry[0]);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0]; 
  };

  const fetchNews = async () => {
    setLoading(true);
    
    const currentDate = getCurrentDate(); 

    const url = `https://news-api14.p.rapidapi.com/v2/trendings?date=${currentDate}&topic=Sports&language=en&limit=50`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
        'x-rapidapi-host': 'news-api14.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const fetchedArticles = data.data.map((item: Article) => ({
        title: item.title,
        excerpt: item.excerpt,
      }));

      setTrendingSoccer(countMentions(fetchedArticles, soccerPlayers));
      setTrendingCricket(countMentions(fetchedArticles, cricketPlayers));
      setTrendingTennis(countMentions(fetchedArticles, tennisPlayers));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto p-4 rounded-md h-full">
      <p className='text-md text-gray-500 border-b border-gray-500 mb-4 t-0 p-3'>Trending</p>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="mb-4 border border-gray-500 rounded-md p-3 h-1/4">
            <div className='w-full rounded-lg h-10  bg-blue-400/20 flex pl-2 items-center'> 
              <p className="text-sm text-blue-300">Trending in Football</p>
            </div>
            <ul>
              {trendingSoccer.map((player) => (
                <li key={player} className="text-sm mt-2">{player}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4 border border-gray-500 rounded-md p-3 h-1/4">
            <div className='w-full rounded-lg h-10  bg-green-400/20 flex pl-2 items-center'> 
              <p className="text-sm text-green-300">Trending in Cricket</p>
            </div>
            <ul>
              {trendingCricket.map((player) => (
                <li key={player} className="text-sm mt-2">{player}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4 border border-gray-500 rounded-md p-3 h-1/4">
            <div className='w-full rounded-lg h-10  bg-red-400/20 flex pl-2 items-center'> 
              <p className="text-sm text-red-300">Trending in Tennis</p>
            </div>
            <ul>
              {trendingTennis.map((player) => (
                <li key={player} className="text-sm mt-2">{player}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default TrendingFeed;



// import React, { useState } from 'react';
// import { soccerPlayers, cricketPlayers, tennisPlayers } from '../../player';

// interface Article {
//   title: string;
//   excerpt: string;
// }

// const TrendingFeed: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [trendingSoccer, setTrendingSoccer] = useState<string[]>([]);
//   const [trendingCricket, setTrendingCricket] = useState<string[]>([]);
//   const [trendingTennis, setTrendingTennis] = useState<string[]>([]);


//   const countMentions = (articles: Article[], playerList: string[]) => {
//     const playerCount: { [key: string]: number } = {};

//     articles.forEach((article) => {
//       playerList.forEach((player) => {
//         const playerRegex = new RegExp(player, 'gi');
//         if (article.title.match(playerRegex) || article.excerpt.match(playerRegex)) {
//           playerCount[player] = (playerCount[player] || 0) + 1;
//         }
//       });
//     });

   
//     const sortedPlayers = Object.entries(playerCount).sort((a, b) => b[1] - a[1]);

   
//     return sortedPlayers.slice(0, 3).map((entry) => entry[0]);
//   };


//   const getCurrentDate = () => {
//     const now = new Date();
//     return now.toISOString().split('T')[0]; 
//   };


//   const fetchNews = async () => {
//     setLoading(true);
    
//     const currentDate = getCurrentDate(); 

//     const url = `https://news-api14.p.rapidapi.com/v2/trendings?date=${currentDate}&topic=Sports&language=en&limit=50`;
//     const options = {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
//         'x-rapidapi-host': 'news-api14.p.rapidapi.com',
//       },
//     };

//     try {
//       const response = await fetch(url, options);
//       const data = await response.json();
//       const fetchedArticles = data.data.map((item: Article) => ({
//         title: item.title,
//         excerpt: item.excerpt,
//       }));

     
//       setTrendingSoccer(countMentions(fetchedArticles, soccerPlayers));
//       setTrendingCricket(countMentions(fetchedArticles, cricketPlayers));
//       setTrendingTennis(countMentions(fetchedArticles, tennisPlayers));
//     } catch (error) {
//       console.error('Error fetching news:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 rounded-md h-full">
//       <button
//         onClick={fetchNews}
//         className="text-gray-500 py-2 px-4 rounded-md mb-4"
//       >
//         Fetch Trending
//       </button>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : (
//         <>
//           <div className="mb-4 border border-gray-500 rounded-md p-3 h-1/4">
//              <div className='w-full rounded-lg h-10  bg-blue-400/20 flex pl-2 items-center'> <p className="text-sm text-blue-300">Trending in Football</p></div>
             
//             <ul>

//               {trendingSoccer.map((player) => (
//                 <li key={player} className="text-sm mt-2">{player}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="mb-4 border border-gray-500 rounded-md p-3 h-1/4">
//             <div className='w-full rounded-lg h-10  bg-green-400/20 flex pl-2 items-center'> <p className="text-sm text-green-300">Trending in Cricket</p></div>
//             <ul>
//               {trendingCricket.map((player) => (
//                 <li key={player} className="text-sm mt-2">{player}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="mb-4 border border-gray-500 rounded-md p-3 h-1/4">
           
//             <div className='w-full rounded-lg h-10  bg-red-400/20 flex pl-2 items-center'> <p className="text-sm text-red-300">Trending in Tennis</p></div>
//             <ul>
//               {trendingTennis.map((player) => (
//                 <li key={player} className="text-sm mt-2">{player}</li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TrendingFeed;