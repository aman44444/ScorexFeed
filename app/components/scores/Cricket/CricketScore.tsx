import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Team {
  name: string;
  shortName: string;
  imageUrl: string; 
}

interface MatchData {
  venue: string;
  match_status: string;
  series: string;
  toss: string;
  match_time: string;
  match_type: string;
  team_a: string; 
  team_b: string; 
  team_a_short: string;
  team_b_short: string;
  team_a_img: string; 
  team_b_img: string; 
  team_a_scores: string; // Team A score
  team_b_scores: string; // Team B score
  team_a_scores_over?: { over: string; score: string }[]; // Team A innings details
  team_b_scores_over?: { over: string; score: string }[]; // Team B innings details
}

const CricketScore: React.FC = () => {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveMatches = async () => {
    const url = 'https://cricket-live-line1.p.rapidapi.com/liveMatches';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '', 
        'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com',
      },
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (result.status) {
        setMatches(result.data);
        console.log(result.data); 
      } else {
        setError('No matches available');
      }
    } catch (err) {
      setError('Error fetching matches: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchLiveMatches} className="pt-7 mb-4 w-full text-gray-400 border-b p-3 border-gray-500 sticky bg-black top-0 ">
        Cricket Score
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      <div>
        {matches.length > 0 &&
          matches.map((matchData, index) => (
            <div
            key={index} 
            className="border p-2 mb-4 rounded-xl bg-black bg-opacity-500 text-white border-gray-500" 
            style={{ width: '250px', padding: '10px' }} >        
         
            <div className="flex items-center mb-2 justify-between">
               <div className='flex'>
               <img
                src={matchData.team_a_img} 
                alt={`${matchData.team_a} flag`}
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
              <span>{matchData.team_a_short}</span>
               </div>
              <span className="mx-2">vs</span>
                 <div className='flex'> 
                 <img
                src={matchData.team_b_img} 
                alt={`${matchData.team_b} flag`}
                width={24}
                height={24}
                className="mr-2  rounded-full"
                 />
                 <span> {matchData.team_b_short}</span>
                 </div>
            </div>

            <div className="mt-2 flex justify-between text-xs w-full ">
              <p>
                {matchData.team_a_scores} 
                {matchData.team_a_scores_over?.length ? ` (${matchData.team_a_scores_over[0].over})` : ''}
              </p>
              <p>
                {matchData.team_b_scores} 
                {matchData.team_b_scores_over?.length ? ` (${matchData.team_b_scores_over[0].over})` : ''}
              </p>
            </div>
            <p className='text-xs text-gray-500'> {matchData.toss}</p>
          </div>
         
          ))
         }
      </div>
    </div>
  );
};

export default CricketScore;

