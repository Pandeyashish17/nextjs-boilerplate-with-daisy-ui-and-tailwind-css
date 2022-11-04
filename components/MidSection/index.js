import React from "react";
import { useStateContext } from "../../context/StateContext";

const MidSection = ({ albums, artists }) => {
  const { setSpotifyUri } = useStateContext();
  return (
    <>
      <div className="h-[70vh ">
        <div className="flex flex-col w-[80vw] gap-2">
          <p className="text-xl mb-1">Albums</p>
          <div className="h-[35vh] overflow-y-auto scrollbar-hide  ">
            {albums.map((album, i) => {
              const { name, uri, artists, date, coverArt } = album;
              return (
                <div className="flex justify-between" key={i}>
                  <div className="flex flex-col ">
                    <button onClick={() => setSpotifyUri(uri)}>
                      <span>{name}</span>{" "}
                      <span className="text-gray-300">{artists.name}</span>
                    </button>
                  </div>
                  <img src={coverArt.url} width={64} height={64} alt="" />
                </div>
              );
            })}
          </div>
          <p className="text-xl mb-1">Artists</p>
          <div className="h-[35vh] overflow-y-auto scrollbar-hide  ">
            {artists.map((artist, i) => {
              const { name, uri, profile } = artist;
              return (
                <div className="flex justify-between" key={i}>
                  <div className="flex flex-col ">
                    <span>{name}</span>{" "}
                    <span className="text-gray-300">{artists.name}</span>
                  </div>
                  <img src={profile.url} width={64} height={64} alt="" />
                </div>
              );
            })}
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default MidSection;
