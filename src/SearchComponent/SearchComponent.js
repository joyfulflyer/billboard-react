import React, { useState } from "react";

function SearchComponent(props) {
  const onInput = async event => {};

  const inputName = async event => {
    props.setName(event.target.value);
  };
  const inputArtist = async event => {
    props.setArtist(event.target.value);
  };
  return (
    <form onSubmit={props.onSubmit} autoComplete={`off`}>
      <input
        type="text"
        placeholder={"name"}
        onInput={inputName}
        name={`name`}
        value={props.name}
      />
      <input
        type="text"
        placeholder={"artist"}
        value={props.artist}
        onInput={inputArtist}
        name={`artist`}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchComponent;
