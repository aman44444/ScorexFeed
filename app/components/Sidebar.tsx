import React, { useState } from 'react';


const Sidebar: React.FC = () => {
  const [showTennisMatches, setShowTennisMatches] = useState(false);
  const [showCricketMatches, setShowCricketMatches] = useState(false);
  const [showFootballMatches, setShowFootballMatches] = useState(false);

  const toggleDropdown = (sport: string) => {
    if (sport === 'tennis') {
      setShowTennisMatches(!showTennisMatches);
    } else if (sport === 'cricket') {
      setShowCricketMatches(!showCricketMatches);
    } else if (sport === 'football') {
      setShowFootballMatches(!showFootballMatches);
    }
  };

  

  return (
    <div>

      <div>
        <button onClick={() => toggleDropdown('tennis')}>
          Tennis Matches ▼
        </button>
        {showTennisMatches && (
          
        )}
      </div>

      <div>
        <button onClick={() => toggleDropdown('cricket')}>
          Cricket Matches ▼
        </button>
        {showCricketMatches && (
          
        )}
      </div>

      <div>
        <button onClick={() => toggleDropdown('football')}>
          Football Matches ▼
        </button>
        {showFootballMatches && (

        ) }
      </div>
    </div>
  );
};

export default Sidebar;
