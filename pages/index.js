import SearchBar from "../components/SearchBar";
import { useStateContext } from "../context/StateContext";
import MidSection from "../components/MidSection";
import SpotifyPlayer from "react-spotify-player";

export default function Home() {
  const { albums, artists, spotifyUri } = useStateContext();
  const size = "compact";
  const view = "list";
  const theme = "black";
  return (
    <>
      <div className="h-screen flex flex-col items-center">
        <SearchBar />
        <MidSection albums={albums} artists={artists} />
        <SpotifyPlayer
          uri={spotifyUri}
          size={size}
          view={view}
          theme={theme}
          autoplay
        />
      </div>
    </>
  );
}
