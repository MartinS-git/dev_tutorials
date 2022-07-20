import React, { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [mapMonsters, setMapMonsters] = useState(monsters);

  // Fetch API Data
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setMonsters(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []); // empty array means to run this function only one time

  function onChangeHandler(event) {
    setSearchInput(event.target.value.toLowerCase());
  }

  useEffect(() => {
    const filteredMonsters = monsters.filter((entries) => {
      return entries.name.toLowerCase().includes(searchInput);
    });
    setMapMonsters(filteredMonsters);
  }, [monsters, searchInput]);

  return (
    <div>
      <h1>Monster Rolodex</h1>
      <SearchBox placeholder='Search monsters' onChange={onChangeHandler} />
      <CardList monsters={mapMonsters} />
    </div>
  );
};

export default App;
