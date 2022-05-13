import { useState, useEffect } from 'react';
import './App.css'

function App() {
  let dummyData = {
    "name": "",
    "glitches": 0,

    "strength": 0,
    "agility": 0,
    "presence": 0,
    "knowledge": 0,
    "toughness": 0,
    "hp": 0,

    "debt": 0,
    "creditor": "",
    "creds": 0,

    "armor": {
      "description": "",
      "reduction": "",
      "notes": ""
    },
    "weapon": {
      "description": "",
      "damage": "",
      "notes": ""
    },
    "gear": []

  }

  const [charData, setCharData] = useState(dummyData);

  function genNewCharacter() {
    fetch('/api/create', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Credentials": true 
      }
    })
      .then(res => res.json())
      .then(data => {setCharData(data);})
  }

  useEffect(() => {
    genNewCharacter();
  }, []);

  function renderBonuses() {
    return (
      <ul className="pl-3 my-3">
        <li><span className="font-semibold">Strength</span> <p>{charData.strength}</p></li>
        <li><span className="font-semibold">Agility</span> <p>{charData.agility}</p></li>
        <li><span className="font-semibold">Presence</span> <p>{charData.presence}</p></li>
        <li><span className="font-semibold">Knowledge</span> <p>{charData.knowledge}</p></li>
        <li><span className="font-semibold">Toughness</span> <p>{charData.toughness}</p></li>
      </ul>
    )
  }

  function renderEquipment() {
    return (
      <ul className="w-full flex flex-col justify-start items-start pl-3 pt-3">
        <li className="w-full mb-4"> 
          <p className="w-full flex">
            <div className="font-semibold w-24">Weapon</div>
            <div className="w-2/3 flex justify-between">
              <p>{charData.weapon.description}</p>
              <em>{charData.weapon.damage}</em>
            </div> 
          </p>
          <p className="pl-24">{charData.weapon.notes}</p>
        </li>
        <li className="w-full mb-4">
          <p className="w-full flex">
            <div className="font-semibold w-24">Armor</div>
            <div className="w-2/3 flex justify-between">
              <p>{charData.armor.description}</p>
              <em>{charData.armor.reduction}</em>
            </div> 
          </p>
          <p className="pl-24">{charData.armor.notes}</p>
        </li>
        <li className="w-full mb-4">
          <ul className="w-full ml-4">
            {charData.gear.map((item, index) => {
              return(<li key={index} className="list-disc w-full"> <p>{item}</p> </li>)
            } )}
          </ul>
        </li>
      </ul>
    )
  }

  return (
    <div className="h-full w-full flex flex-col justify-start items-center p-3 font-mono">
      <header className="w-full flex flex-col justify-center items-center pt-3">
        <p>A character generator for</p>
        <img alt="compatible with CY_BORG cyberpunk RPG" src="cyLogo.svg" className="sm:w-3/5 lg:w-2/5 mb-3"></img>
        <button onClick={genNewCharacter} className="reload text-xl mt-8 mb-8 px-3 type font-display">[ click to reloAd ]</button>
      </header>
      <main className="grow sm:w-full lg:w-4/6 flex flex-col justify-start items-center text-lg text-center">
        <div className="w-full border-y border-black py-3 flex justify-around">
          <div><p className="inline font-semibold">Name </p> <span> {charData.name}</span></div>
          <div><p className="inline font-semibold">Class </p> <span>none</span></div>
          <div><p className="inline font-semibold">HP </p> <span>{charData.hp}</span></div>
          <div><p className="inline font-semibold">Glitches </p> <span>{charData.glitches}</span></div>
        </div>
        <div className="w-full flex flex-wrap text-left ">
          <div className="sm:w-full md:w-1/2 border-black border-b md:border-r p-4">
            <h3 className="inline-block py-1 bg-cy-yellow">you Are {charData.name}</h3>
            <p className='mt-3'><em>randomly genereated character description needed</em></p>
          </div>
          <div className="sm:w-full md:w-1/2 border-black border-b p-4">
            <h3 className="inline-block py-1 bg-cy-yellow">no clAss</h3>
            <p className='mt-3'>dfjksdfhsjk dfhhsjkdfhkh sjkdfskdfjk hsdfksdf ksdfsdfsd fsdfsdf</p>
          </div>
          <div className="sm:w-full md:w-1/2 border-black border-b md:border-b-0 md:border-r p-4">
            <h3 className="inline-block py-1 bg-cy-yellow">Abilities</h3>
            {renderBonuses()}
          </div>
          <div className="sm:w-full md:w-1/2 p-4">
            <h3 className="inline-block py-1 bg-cy-yellow">equipment</h3>
            {renderEquipment()}
          </div>
        </div>
      </main>
      <footer className="p-4 text-center text-sm">
          <div>CY_BORG is ©2022 Stockholm Kartell. Web app by <strong className="text-cy-blue">Material Context</strong>.</div>
          <div className="text-slate-500">v0.0.1 - "Alliansen Goon Squad"</div>
      </footer>
    </div>
  );
}

export default App;
