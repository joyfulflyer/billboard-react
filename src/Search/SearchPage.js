import React, { useState } from "react";
import SearchComponent from "../SearchComponent/SearchComponent";

function SearchPage(props) {
  const [name, setSongName] = useState("");
  const [artist, setSongArtist] = useState("");
  const submitFunc = async event => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <div>
      <SearchComponent
        onSubmit={submitFunc}
        setArtist={setSongArtist}
        setName={setSongName}
      />
      <div>{(name || artist) && `Name: ${name} Artist: ${artist}`}</div>
    </div>
  );
}

export default SearchPage;
