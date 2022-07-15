import './App.css';
// import { useState } from 'react/cjs/react.production.min';

function App() {
// 	const [monsters, setMonsters] = useState([
// 	{name: "Linda"},
// 	{name: "Frank"},
// 	{name: "Jacky"}
// ])

const monsters = [
	{name: "Linda"},
	{name: "Frank"},
	{name: "Jacky"}
]

  return (
<div>
      {monsters.map((monster) => {
		return <h1>{monster.name}</h1>
	  })}
	  </div>
  );
}

export default App;
