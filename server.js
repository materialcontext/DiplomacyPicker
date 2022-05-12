const express = require('express');

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

app.use(cors())

const NAMES = [
  "Ao",
  "Bell",
  "Blink",
  "Clock",
  "Cord",
  "Duzi",
  "Fase",
  "Fu",
  "Glam",
  "Glare",
  "Gul",
  "Hira",
  "Hla",
  "Ia",
  "Kei",
  "Key",
  "Lhamo",
  "Måne",
  "Mehr",
  "Mille",
  "Mpho",
  "Nur",
  "Phix",
  "Reeve",
  "Riz",
  "Shade",
  "Soma",
  "Tick",
  "Vac",
  "Wick",
  "Xleo",
  "Yann",
  "Zalec",
  "Zenit",
  "Zign",
  "Zola"
];

function getName() {
  let name = NAMES[rollDice(1, 36, true) - 1];
  return name;
}

function rollDice(numDice, numSides, sum) {
  let dice = [];
  for (let i = 0; i < numDice; i++) {
    dice.push(Math.floor(Math.random() * numSides) + 1);
  }
  if (sum) {
    return dice.reduce((a, b) => a + b, 0);
  }
  return dice;
}

function getCreds() {
  let roll = rollDice(2, 6, true);
  let creds = roll * 10
  return creds;
}

function getGear() {
  let rolls = [];
  rolls.push(...rollDice(1, 8, false));
  rolls.push(...rollDice(2, 12, false));

  console.log(rolls)
  let gear = lookUpGear(rolls);
  return gear;
}

function lookUpGear(rollArr) {
  let gear = [];
  for (let i = 0; i < rollArr.length; i++) {
    gear.push(gearTable[`${i + 1}`][rollArr[i]]);
  }
  return gear;
}

const gearTable = {
  1: {
    1: "Mirrorshades.",
    2: "CWPC Metro card, d8 trips left.",
    3: "Hangover.",
    4: "Pack of realTobacco™ smokes.",
    5: "d4+1 flashbangs, or +4DR on everything for d4 rounds.",
    6: "d4 hand grenades, d6 damage to up to d3 targets.",
    7: "Old-school motorcycle. Fuel is hard to come by.",
    8: "Stolen taxi. Faked or removed transponders. May trigger alarmswhen entering high-sec areas."
  },
  2: {
    1: "Paracord, 30m.",
    2: "Micro torch cutter, power for d4 uses.",
    3: "Bio/ID scanner, can track a person within 50m.",
    4: "Breathing mask, provides oxygen in gas or underwater.",
    5: "Collapsible ladder, 5m.",
    6: "First aid kit, d3 uses. Stops bleeding/infection and heals d6 HP",
    7: "Crowbar, d4 damage.",
    8: "Superlube.",
    9: "Grappling-hook crossbow, d4 damage.",
    10: "Small bottle of pulverized acid.",
    11: "Crime scene kit.",
    12: "Random cybertech, roll d10 on page 69."
  },
  3: {
    1: "Red-juice stimjector, d4 doses. Heals d10 HP.",
    2: "Adrenachrome_HST, d3 doses. Heals d6 HP, +1 on all abilities for d6 rounds, then -1 until rest.",
    3: "Drone suit. Slow but quiet flight. Attack and defense tests are +4DR while flying.",
    4: "Small but jailbroken Robo-K9. d6+2 HP, bite d4, only obeys you*",
    5: "Tiny surveillance drone, 300m range.",
    6: "Optic camo suit.",
    7: "Noisemaker. Floods 20m area with fake data for d4 minutes, making remote communication and surveillance impossible.",
    8: "Fake ID. Good enough to pass a random check, might not work if they are looking for you.",
    9: "Visionvisor. Zoom, camera, heat/night vision, ultrasound.",
    10: "Random cybertech, roll d10 on page 69.",
    11: "Cyberdeck with d3 slots and 2 random Apps.",
    12: "A random Nano power."
  }
}

function getBonus() {
    let roll = rollDice(3, 6, true);
    console.log(roll)
    let bonus = lookUpBonus(roll);
  return bonus;
}

function lookUpBonus(roll) {
  if (roll > 12) {
    if (roll > 16) {
      return 3;
    }
    if (roll > 14) {
      return 2;
    }
    return 1;
  }
  if (roll < 9) {
    if (roll > 6) {
      return -1;
    }
    if (roll > 4) {
      return -2;
    }
    return -3;
  }
  return 0;
  }

function getDebt() {
  let roll = rollDice(3, 6, true);
  let debt = roll * 1000;
  return debt;
}

function getCreditor() {
  let roll = rollDice(1, 12, true);
  let creditor = creditorTable[roll];
  return creditor;
}

const creditorTable = {
  1: "a crime syndicate.",
  2: "an anonymous hacker collective.",
  3: "your distant relative, a corrupt politician’s assistant.",
  4: "a gang run by your childhood bully.",
  5: "an unknown benefactor signing their messages with YN.",
  6: "a death cult run by a board member from a powerful corp.",
  7: "a roadrunner clan who may request services and housing as long as the debt is unpaid.",
  8: "the owner of a seedy club or dive bar.",
  9: "a fixer with cops on their payroll.",
  10: "someone you trust, hospitalized with increasing medical bills.",
  11: "A semi-sentient AI cluster slowly building up its influence.",
  12: "a small but extremely violent SecCorp.",
}

function getWeapon() {
  let roll = rollDice(1, 12, true);
  let weapon = weaponsTable[roll];
  if (weapon.type === "ranged") weapon["ammo"] = rollDice(1, 6, true);
  return weapon;
}

const weaponsTable = {
  1: {
    description: getImprovisedWeapon(),
    damage: "d4",
    notes: null,
    type: "melee"
  },
  2: {
    description: "Machete",
    damage: "d6",
    notes: null,
    type: "melee"
  },
  3: {
    description: "Too Many Throwing Knives",
    damage: "d4",
    notes: "two attacks/round",
    type: "melee"
  },
  4: {
    description: "Ancient Revolver",
    damage: "d8",
    notes: null,
    type: "ranged"
  },
  5: {
    description: "SmartGun™",
    damage: "d6a",
    notes: "d10a with SmartJack™",
    type: "ranged"
  },
  6: {
    description: "Two Small SMGs",
    damage: "d6a",
    notes: "only autofire",
    type: "ranged"
  },
  7: {
    description: "Shotgun",
    damage: "d8",
    notes: null,
    type: "ranged"
  },
  8: {
    description: "Monosword",
    damage: "d8",
    notes: null,
    type: "melee"
  },
  9: {
    description: "Assault Rifle",
    damage: "d8a",
    notes: null,
    type: "ranged"
  },
  10: {
    description: "Assault Rifle w/Grenade Launcher",
    damage: "d8a",
    notes: "d6 with grenade, up to 3 targets",
    type: "ranged"
  },
  11: {
    description: "Pulse Rifle",
    damage: "d10a",
    notes: null,
    type: "ranged"
  },
  12: {
    description: "Sniper Rifle",
    damage: "2d10",
    notes: "x3 crit damage. When aiming for two rounds: -4DR and +2 damage.",
    type: "ranged"
  }
}

function getImprovisedWeapon() {
  let improvisedWeapons = ["brick", "shiv", "sharpened femur", "broken bottle"]
  return improvisedWeapons[rollDice(1, 4, true) - 1];
}

function getArmor() {
  let roll = rollDice(1, 6, true);
  let armor = armorTable[roll];
  return armor;
}

const armorTable = {
  1: {
    description: "No armor.",
    reduction: "none",
    notes: null
  },
  2: {
    description: "StyleGuard",
    reduction: "-d2",
    notes: "Looks Just Like Clothes"
  },
  3: {
    description: "Rough",
    reduction: "-d4",
    notes: "A heavy duty jacket or full kevlar."
  },
  4: {
    description: "SmartWear",
    reduction: "-d4",
    notes: "Equipped with Adrenachrome_HST auto-injector that fires if the wearer is Battered."
  },
  5: {
    description: "Combat Armor",
    reduction: "-d6",
    notes: "Equipped with Adrenachrome_HST auto-injector that fires if the wearer is Battered. +2DR on Agility tests including Defense."
  },
  6: {
    description: "EndGame Class ExoSuit",
    reduction: "-d8",
    notes: "Equipped with multiple customizable injectors, jump jets, motorized joints and more. Not for sale. +4DR on Agility tests. Defense is +2DR, Toughness and Strength are −2DR.Can jump 4× regular height and length."
  }
}

function getHP(toughness) {
  let roll = rollDice(1, 8, true);
  let hp = roll + toughness;
  return hp > 0 ? hp : 1;
}

function getGlitches() {
  return rollDice(1, 2, true);;
}

function generateCharacter() {
  let character = {};
  character.name = getName();
  character.glitches = getGlitches();

  character.strength = getBonus();
  character.agility = getBonus();
  character.presence = getBonus();
  character.knowledge = getBonus();
  character.toughness = getBonus();
  character.hp = getHP(character.toughness);
  
  character.debt = getDebt();
  character.creditor = getCreditor();
  character.creds = getCreds();

  character.weapon = getWeapon();
  character.armor = getArmor();
  character.gear = getGear();

  console.log(character);
  return character;
}

const path = require('path');
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get('/api/create', (req, res) => { 
  res.json(generateCharacter());
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
