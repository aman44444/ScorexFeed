import Navbar from "./Navbar";
import NewsFeed from "./NewsFeed";
import FetchMatches from "./scores/Cricket/CricketScore";
import FootballLiveMatches from "./scores/Football/FootballScore";
import TennisLiveScores from "./scores/Tennis/TennisScore";
import Trending from "./Trending";

const Layout = () => {
  return (
    <div className="h-screen w-full bg-black ">
      <div className=" h-16 sm:h-20 ">
        <Navbar />
      </div>
      <div className="flex h-5/6  w-full justify-around ">
        <div className=" bg-black h-full rounded-md w-3/12 hidden sm:block  no-scrollbar overflow-y-auto sm:mt-5">
          <div className="flex flex-col items-center">
            <FetchMatches />
            <FootballLiveMatches />
            <TennisLiveScores />
          </div>
        </div>

        <div className=" bg-black h-full border no-scrollbar overflow-y-auto border-gray-600 w-full sm:w-6/12 rounded-xl ">
          <div className=" flex items-center justify-around w-full backdrop-blur-lg bg-transparent h-10 sm:h-16 sticky top-0 text-gray-500 border-b border-gray-500">
            <div>Football</div>
            <div>Cricket</div>
            <div>Tennis</div>
          </div>
          <NewsFeed />
        </div>
        <div className=" bg-black h-full hidden sm:block w-3/12 rounded-md  ">
          <Trending />
        </div>
      </div>
    </div>
  );
};

export default Layout;
