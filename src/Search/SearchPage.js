import React, { useState, useEffect, useCallback } from "react";
import SearchComponent from "../SearchComponent/SearchComponent";
import { get } from "axios";
import MultiSong from "../MultiSong/MultiSong";

function SearchPage(props) {
  const { location: { query = {} } = {} } = props;
  const [name, setSongName] = useState(query.name);
  const [artist, setSongArtist] = useState(query.artist);
  const [selectedSongs, setSelectedSongs] = useState([]);
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

  const addSelectedSong = entry => {
    if (!selectedSongs.includes(entry)) {
      const a = [...selectedSongs, entry];
      setSelectedSongs(a);
    }
  };

  const removeSelectedSong = entry => {
    const newSongs = selectedSongs.filter(comp => {
      return entry !== comp;
    });
    setSelectedSongs(newSongs);
  };

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
        <div>
          {songs.map(entry => {
            return (
              <div
                key={entry.id}
                onClick={() => {
                  addSelectedSong(entry);
                }}
              >
                {entry.name} {entry.artist}
              </div>
            );
          })}
        </div>
        <div className="pills">
          {selectedSongs.map(selected => {
            return (
              <button onClick={() => removeSelectedSong(selected)}>
                {selected.name}
              </button>
            );
          })}
        </div>
        <div>
          {selectedSongs && selectedSongs.length > 0 && (
            <MultiSong entries={selectedSongs} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
