import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [searchResults, setsearchResults] = useState([]);
  const [search, setSearch] = useState("a");
  
  console.log(search);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/search/",
      params: {
        q: search,
        type: "albums",
      },
      headers: {
        "X-RapidAPI-Key": "93aeb735c5msh7297516bc31c8fbp15accfjsn3206375c77c5",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
       setsearchResults(
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
        );      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="h-screen flex justify-center">
        <div className="form-control h-[10vh] mt-4">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>{" "}
        {JSON.stringify(searchResults, null, 2)}
      </div>
    </>
  );
}
