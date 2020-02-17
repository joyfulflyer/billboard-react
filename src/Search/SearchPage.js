import React, { useState, useEffect, useCallback } from "react";
import SearchComponent from "../SearchComponent/SearchComponent";
import { get } from "axios";
import Song from "../Song/Song";

function SearchPage(props) {
  const { query = {} } = props.location;
  const [name, setSongName] = useState(query.name);
  const [artist, setSongArtist] = useState(query.artist);
  const [selectedSong, selectSong] = useState();
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
        <div display>
          {songs.map(entry => {
            return (
              <div
                key={entry.id}
                onClick={() => {
                  selectSong(entry);
                }}
              >
                {entry.name} {entry.artist}
              </div>
            );
          })}
        </div>
        <div>{selectedSong && <Song songId={selectedSong.id} />}</div>
      </div>
    </div>
  );
}

export default SearchPage;
