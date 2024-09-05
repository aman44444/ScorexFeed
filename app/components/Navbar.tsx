import React, { useState } from "react";
import TrendingFeed from "./Trending";
import TennisScoreCard from "./scores/Tennis/TennisScore";
import FootballScore from "./scores/Football/FootballScore";
import CricketScore from "./scores/Cricket/CricketScore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" bg-black w-full h-full flex justify-between sm:justify-center items-center pl-4 pr-4">
      <div className="flex flex-col">
        <div className="flex sm:justify-center ">
          <p className="text-green-800 font-semibold">Scores</p>
          <p className="text-white font-semibold">Source</p>
        </div>
        <div>
          <p className="text-xs hidden sm:block">
            The best Source of Scores and News
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:hidden text-white">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="6"
                y1="18"
                x2="18"
                y2="6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center text-2xl z-10">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2"
              aria-label="Close Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="18"
                  x2="18"
                  y2="6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <nav className="flex w-full mt-6 no-scrollbar overflow-y-auto h-screen">
              <div className="mt-4 flex flex-col items-center w-1/2 no-scrollbar overflow-y-auto ">
                <CricketScore />
                <FootballScore />
                <TennisScoreCard />
              </div>
              <div >
                <TrendingFeed />
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
