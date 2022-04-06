const express = require('express');

const app = express();

const COUNTRIES = [
  "Turkey", "Russia", "Austria", 
  "Italy", "Germany",  "France", 
  "Britain"
];

const players = ["Tyler", "Caleb", "Matt", "Nathan", "Kyle", "Richard", "Derek"];

function randomPrefs() {
  let output = [];
  for (let i = 0; i < 3;) {
    let randomChoice = COUNTRIES[Math.floor(Math.random() * 7)];
    if (!output.includes(randomChoice)) {
      output.push(randomChoice)
      i++
    }
  }
  return output
}

function dummyGame() {
  let output = []
  for (let i = 0; i < 7; i++) {
    output.push({
      name: players[i],
      prefs: randomPrefs(),
      country: undefined,
      tier: 0,
      priority: Math.random()
    })
  }
  return output;
}
const game = dummyGame();

function initialize() {
  let countries = [];
  for(const player in game) {
    game[player].country = game[player].prefs[0]
    countries.push(game[player].country)
  }
  console.log(countries)
  return countries;
}

function setNextChoice(player, output) {
  if (game[player].tier < 2) {
    game[player].tier++
    game[player].country = game[player].prefs[game[player].tier]
    console.log(game[player].name, "'s country changed to ", game[player].country)
  } else {
      let unused = COUNTRIES.filter(country => !output.includes(country));
      game[player].country = unused[Math.floor(Math.random() * unused.length)];
      game[player].tier++
      console.log(game[player].name, "'s country changed to unused country", game[player].country )
  }
}

function resolveConflicts(player, selection, output) {
  if (!output.includes(selection)) {
    return selection
  }
  setNextChoice(player, output)
  return resolveConflicts(player, game[player].country, output)
}

function setCountries(arr) {
  let input = [...arr];
  let output = Array.apply(null, Array(7));
  let pickOrder = game
    .map((player, index) => [index, player.priority])
    .sort((a, b) => b[1] - a[1])
    .map(pair => pair[0]);

  for (const player of pickOrder) {
    output[player] = resolveConflicts(player, input[player], output);
  }
}

setCountries(initialize())

function formatResults() {
  let results = {}
  for (const player of game) {
    results[player.name] = player.country;
  }
  return results
}

app.get('/', (req, res) => {
  res.json(formatResults())
});

app.listen(3000, () => {
  console.log('server started');
});
