import React, { useState } from "react";
import { TextInput } from "react-native";
import { s } from "./SearchBar.style";

export const SearchBar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = () => {
    // Call the onSubmit function passed from the parent component
    onSubmit(searchValue);

    // Clear the search input value
    setSearchValue("");
  };

  return (
    <TextInput
      value={searchValue}
      onChangeText={setSearchValue}
      onSubmitEditing={handleSubmit}
      style={s.input}
      placeholder="Type a city... Ex: Casablanca"
    />
  );
};
