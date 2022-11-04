import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
const Context = createContext();
export const StateContext = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("one direction ");
  const [debouncedValue] = useDebounce(search, 1000);
  const [spotifyUri, setSpotifyUri] = useState(
    "spotify:album:57VbRlCDTLXVKvSMBFUXv4"
  );
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/search/",
      params: {
        q: debouncedValue,
        type: "multi",
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_SPOTIFY_URI,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      axios.request(options).then(function (response) {
        console.log(response.data);
        setAlbums(
          response.data.albums.items.map((item) => {
            return {
              name: item.data.name,
              uri: item.data.uri,
              artists: item.data.artists.items[0].profile,
              artistsUri: item.data.artists.items[0].uri,
              coverArt: item.data.coverArt.sources[1],
              image: item.data.coverArt.sources[0],
              date: item.data.date.year,
            };
          })
        );
        setArtists(
          response.data.artists.items.map((item) => {
            return {
              name: item.data.profile.name,
              uri: item.data.uri,
              profile: item.data.visuals?.avatarImage?.sources[1] ||
                item.data.visuals?.avatarImage?.sources[0] || {
                  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThOTBLkvfQOhD6S-pwebKIn2wpgD3h0JI-yQ&usqp=CAU",
                },
            };
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, [debouncedValue]);

  return (
    <Context.Provider
      value={{
        albums,
        artists,
        setSearch,
        spotifyUri,
        setSpotifyUri,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
