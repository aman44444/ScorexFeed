import React, { useState } from 'react';


interface Team {
  name: string;
  shortName: string;
  logoUrl: string;
  score: string;
}

interface Match {
  eventId: string;
  startTime: number;
  stage: string;
  gameTime: string;
  round: string;
  homeTeam: Team;
  awayTeam: Team;
}

const FootballScore: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveFootballMatches = async (): Promise<void> => {
    const url = 'https://flashlive-sports.p.rapidapi.com/v1/events/live-list?locale=en_INT&sport_id=1&timezone=-4';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY || '',
        'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
      }
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data && Array.isArray(data.DATA)) {

        const parsedMatches: Match[] = data.DATA.flatMap((tournament: {
          EVENTS: Array<{
            EVENT_ID: string;
            START_TIME: number;
            STAGE: string;
            GAME_TIME: string;
            ROUND: string;
            HOME_NAME: string;
            SHORTNAME_HOME: string;
            HOME_IMAGES: string[];
            HOME_SCORE_CURRENT: string;
            AWAY_NAME: string;
            SHORTNAME_AWAY: string;
            AWAY_IMAGES: string[];
            AWAY_SCORE_CURRENT: string;
          }>
        }) => 
          (tournament.EVENTS || []).map((event) => ({
            eventId: event.EVENT_ID,
            startTime: event.START_TIME,
            stage: event.STAGE,
            gameTime: event.GAME_TIME,
            round: event.ROUND,
            homeTeam: {
              name: event.HOME_NAME,
              shortName: event.SHORTNAME_HOME,
              logoUrl: event.HOME_IMAGES[0], 
              score: event.HOME_SCORE_CURRENT,
            },
            awayTeam: {
              name: event.AWAY_NAME,
              shortName: event.SHORTNAME_AWAY,
              logoUrl: event.AWAY_IMAGES[0], 
              score: event.AWAY_SCORE_CURRENT,
            }
          }))
        );

        setMatches(parsedMatches);
      } else {
        setError('No live matches found.');
      }
    } catch (err) {
      setError('Error fetching matches: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-5/6'>
       <button onClick={fetchLiveFootballMatches} className="text-sm sm:text-md  p-4 mb-4 w-full text-gray-500 border-b border-gray-500 sticky bg-black top-0 ">
        Football Score
      </button>

      {loading && <p className='text-xs text-gray-300'>Loading...</p>}
      {error && <p className='text-xs text-gray-300'>{error}</p>}
     <div className='flex flex-col justify-center items-center '>
      {matches.length > 0 && matches.map((match) => (
        <div key={match.eventId} className=" w-full border p-4 mb-4 rounded-xl border-gray-500" >
    
           <p className='text-xs'>Game Time: {match.gameTime}</p>
          <div className="flex items-center mb-2">
            <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} className="w-4 h-4 mr-2" />
            <span className='text-xs'>{match.homeTeam.shortName}</span>
            <span className=" text-xs mx-2">vs</span>
            <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} className="w-4 h-4 mr-2" />
            <span className='text-xs'>{match.awayTeam.shortName}</span>
          </div>
          <div className='w-full flex justify-center '>
           

           <p className='text-xs '>{match.homeTeam.score} - {match.awayTeam.score}</p>
          </div>
          <p className='text-xs'>Stage: {match.stage}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default FootballScore;

