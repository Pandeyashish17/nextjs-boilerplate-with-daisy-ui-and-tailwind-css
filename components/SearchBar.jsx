import React from "react";
import { useStateContext } from "../context/StateContext";

const SearchBar = () => {
  const { setSearch } = useStateContext();
  return (
    <>
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
    </>
  );
};

export default SearchBar;
