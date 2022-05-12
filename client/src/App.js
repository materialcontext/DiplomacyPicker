import { useState, useEffect } from 'react';

function App() {
  const [charData, setCharData] = useState([]);

  useEffect(() => {
    fetch('/api/create', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Credentials": true 
      }
    })
      .then(res => res.json())
      .then(data => setCharData(data))
      .then(console.log(charData));
  }, []);


  return (
    <div className="h-screen w-screen p-4 font-mono">
      <header></header>
      <main className="h-full w-full flex flex-col justify-between items-center text-3xl text-center">
        <div className="sm:w-full lg:w-2/5 border-y border-black py-2 flex justify-around">
          <h3>Name: {charData.name}</h3>
          <h3>HP: {charData.hp}</h3>
          <h3>Glitches: {charData.glitches}</h3>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
