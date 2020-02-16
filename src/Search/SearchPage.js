import React, { useState, useEffect } from "react";
import SearchComponent from "../SearchComponent/SearchComponent";
import { get } from "axios";

function SearchPage(props) {
  const { query = {} } = props.location;
  const [name, setSongName] = useState(query.name);
  const [artist, setSongArtist] = useState(query.artist);
  const [songs, setSongs] = useState([]);
  const submitFunc = async event => {
    event.preventDefault();
    getSearchResults();
  };
  async function getSearchResults() {
    var queryString = `?`;
    if (name) {
      queryString = queryString + `name=${name}`;
    }
    if (name && artist) {
      queryString = queryString + `&`;
    }
    if (artist) {
      queryString = queryString + `artist=${artist}`;
    }
    try {
      const response = await get(encodeURI(`/api/search/query` + queryString));
      setSongs(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (name || artist) {
      getSearchResults();
    }
  });
  return (
    <div>
      <SearchComponent
        onSubmit={submitFunc}
        setArtist={setSongArtist}
        setName={setSongName}
      />
      <div>
        {songs.map(entry => {
          return (
            <div>
              {entry.name} {entry.artist}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;
