import React, { useState, useEffect } from 'react';
import { PiTennisBallLight } from "react-icons/pi";
import { BiSolidCricketBall } from "react-icons/bi";
import { IoMdFootball } from "react-icons/io";

const icons = [
  { component: <BiSolidCricketBall />, label: 'Cricket' },
  { component: <PiTennisBallLight />, label: 'Tennis' },
  { component: <IoMdFootball />, label: 'Football' },
];

const SpinningIcon: React.FC = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsSpinning(true);

      setTimeout(() => {
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        setIsSpinning(false); 
      }, 1000); 

    }, 3000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className={`text-5xl ${isSpinning ? 'animate-spin-once' : ''}`}>
        {icons[currentIconIndex].component}
      </div>
    </div>
  );
};

export default SpinningIcon;
