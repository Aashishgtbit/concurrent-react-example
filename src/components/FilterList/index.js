import React, { useState, useCallback } from "react";
import SearchBar from "../SearchBar";

const FilterList = props => {
  const commentsList = props.commentsList.read();
  const [filteredListdata, updateFilterList] = useState(commentsList);

  const handleInputChange = useCallback(searchText => {
    if (searchText === "") {
      updateFilterList(commentsList);
      return;
    }
    updateFilterList(filteredListdata => {
      const newList = [];
      filteredListdata.forEach(element => {
        console.log("comment :", element.name.toLowerCase());
        console.log("searchText :", searchText);

        if (element.name.toLowerCase().includes(searchText.toLowerCase())) {
          newList.push(element);
        }
      });
      return newList;
    });
  });
  return (
    <div>
      <SearchBar onChange={handleInputChange} />
      <div className="wrapper-filterlist">
        {filteredListdata.map(comment => {
          return <div>{comment.name}</div>;
        })}
      </div>
    </div>
  );
};

export default FilterList;
