import React, { useState } from 'react';

interface Player {
  name: string;
  shortName: string;
  ranking: number;
  country: { name: string; alpha2?: string }; 
  currentScore?: number;
  point?: string; 
}

interface Match {
  tournament?: { name?: string; category?: { name?: string } }; 
  roundInfo?: { round?: number; name?: string }; 
  homeTeam?: Player;
  awayTeam?: Player;
  homeScore?: { display: string; point: string }; 
  awayScore?: { display: string; point: string }; 
  status?: { description?: string }; 
}

const TennisScoreCard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveTennisMatches = async () => {
    const url = 'https://tennisapi1.p.rapidapi.com/api/tennis/events/live';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
        'x-rapidapi-host': 'tennisapi1.p.rapidapi.com',
      },
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMatches(result.events || []);
    } catch (err) {
      setError('Failed to fetch tennis matches.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >

      <button
        onClick={fetchLiveTennisMatches}
        className="pt-7 mb-4 w-full text-gray-400 border-b p-3 border-gray-500 sticky bg-black top-0 "
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Tennis Score'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {matches.length > 0 &&
        matches.map((match, index) => {
          const homeScoreDisplay = match.homeScore?.display || '0';
          const awayScoreDisplay = match.awayScore?.display || '0';
          const homePoint = match.homeScore?.point || '0';
          const awayPoint = match.awayScore?.point || '0';

         
          const homeCountryFlag = match.homeTeam?.country?.alpha2
            ? `https://flagcdn.com/${match.homeTeam.country.alpha2.toLowerCase()}.svg`
            : 'https://via.placeholder.com/32'; 

          const awayCountryFlag = match.awayTeam?.country?.alpha2
            ? `https://flagcdn.com/${match.awayTeam.country.alpha2.toLowerCase()}.svg`
            : 'https://via.placeholder.com/32'; 

          return (
            <div key={index} className="border p-2 mb-4 rounded-xl border-gray-500" style={{ width: '250px', padding: '10px' }}>
              <h2 className="text-xl font-bold">{match.tournament?.name || 'Unknown Tournament'}</h2>
              <p className="text-sm mb-2">
                {match.tournament?.category?.name || 'Unknown Category'} - {match.roundInfo?.name || 'Unknown Round'}
              </p>
              <div className="flex justify-between items-center">
         
                <div>
                  <img
                    src={homeCountryFlag}
                    alt={`${match.homeTeam?.country?.name || 'Unknown'} flag`}
                    width={32}
                    height={32}
                    className="mr-2 "
                  />
                  <p className='text-xs'>{match.homeTeam?.name || 'Unknown Player'}</p>
                  <p className='text-xs'>Rank: {match.homeTeam?.ranking || 'N/A'}</p>
                </div>

            
                <div className="flex flex-col text-center">
                 
                  <p className="font-bold text-xs">{homeScoreDisplay} - {awayScoreDisplay}</p>
                
                  <p className='text-xs'>Points: {homePoint} - {awayPoint}</p>
                
                  <p className='xs'>Status: {match.status?.description || 'Unknown'}</p>
                </div>

               
                <div>
                  <img
                    src={awayCountryFlag}
                    alt={`${match.awayTeam?.country?.name || 'Unknown'} flag`}
                    width={32}
                    height={32}
                    className="mr-2 "
                  />
                  <p className='text-xs'>{match.awayTeam?.name || 'Unknown Player'} </p>
                  <p className='text-xs'>Rank: {match.awayTeam?.ranking || 'N/A'}</p>
                </div>
              </div>
            </div>
              );
            })
           
            }
        
    </div>
  );
};

export default TennisScoreCard;

