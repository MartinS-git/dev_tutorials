import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [monsters, setMonsters] = useState([]);
  const [mapMonsters, setMapMonsters] = useState([]);

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
  }, []);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const filteredMonsters = monsters.filter((entries) => {
      return entries.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setMapMonsters(filteredMonsters);
  }, [inputValue]);

  function RenderMonster() {
    let monsterScr = inputValue ? mapMonsters : monsters;

    return monsterScr.map((monster) => {
      return <h1 key={monster.id}>{monster.name}</h1>;
    });
  }

  return (
    <div>
      <input
        className='search-box'
        type='search'
        placeholder='Search monsters'
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        value={inputValue}
      />
      <RenderMonster />
    </div>
  );
}

export default App;
