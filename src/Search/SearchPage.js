import React, { useState, useEffect, useCallback } from "react";
import SearchComponent from "../SearchComponent/SearchComponent";
import { get } from "axios";

function SearchPage(props) {
  const { query = {} } = props.location;
  const [name, setSongName] = useState(query.name);
  const [artist, setSongArtist] = useState(query.artist);
  const [songs, setSongs] = useState([]);
  const submitFunc = async event => {
    event.preventDefault();
    console.log(`submit`);
    getSearchResults();
  };

  const getSearchResults = useCallback(async () => {
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
  }, [name, artist, setSongs]);

  useEffect(() => {
    if (name || artist) {
      console.log(
        `getting search results because name and artist are not blank`
      );
      getSearchResults();
    }
  }, [name, artist, getSearchResults]);
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
            <div key={entry.id}>
              {entry.name} {entry.artist}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;
