import React, { useCallback } from "react";

const SearchBar = props => {
  const onChange = useCallback(
    e => {
      console.log(e.target.value);
      if (props.onChange) {
        props.onChange(e.target.value);
      }
    },
    [props]
  );

  return (
    <div className="wrapper-search-bar">
      <input
        className="search-bar"
        placeholder="search comments"
        onChange={onChange}
        value={props.value}
      />
    </div>
  );
};

export default SearchBar;
