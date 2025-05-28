import React, { useState } from "react";

const BASE_TICK = 1200;
const MIN_TICK = 1;

const percentageUpgrades = {
  P1: 0.2,
  P2: 0.4,
  P3: 0.6,
};

const fixedUpgrades = {
  F1: 200,
  F2: 400,
  F3: 600,
};

const allUpgrades = [
  { id: "P1", label: "Percentage Tier 1 (-20%)" },
  { id: "P2", label: "Percentage Tier 2 (-40%)" },
  { id: "P3", label: "Percentage Tier 3 (-60%)" },
  { id: "F1", label: "Fixed Tier 1 (-200 ticks)" },
  { id: "F2", label: "Fixed Tier 2 (-400 ticks)" },
  { id: "F3", label: "Fixed Tier 3 (-600 ticks)" },
];

function getAllCombos(arr, maxLength) {
  const results = [];
  const n = arr.length;

  for (let i = 1; i <= maxLength; i++) {
    const generate = (combo = [], start = 0) => {
      if (combo.length === i) {
        results.push(combo);
        return;
      }
      for (let j = start; j < n; j++) {
        generate([...combo, arr[j]], j + 1);
      }
    };
    generate();
  }

  return results;
}

export default function App() {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [tooFast, setTooFast] = useState(false);
  const [bestTick, setBestTick] = useState(null);

  const toggleUpgrade = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((u) => u !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const calculateTicks = (sel) => {
    const upgrades = sel || selected;
    const percentMods = upgrades.filter((u) => u.startsWith("P"));
    const fixedMods = upgrades.filter((u) => u.startsWith("F"));

    let percentTotal = percentMods.reduce((sum, u) => sum + percentageUpgrades[u], 0);
    let percentageResult = BASE_TICK * (1 - percentTotal);

    let fixedTotal = fixedMods.reduce((sum, u) => sum + fixedUpgrades[u], 0);
    let finalTick = percentageResult - fixedTotal;

    if (finalTick <= 0) {
      setTooFast(true);
      setResult(null);
    } else {
      setTooFast(false);
      setResult(Math.max(MIN_TICK, Math.round(finalTick)));
    }
  };

  const getBestCombo = () => {
    const upgradeIDs = allUpgrades.map((u) => u.id);
    const combos = getAllCombos(upgradeIDs, 3);

    let bestCombo = null;
    let bestTime = BASE_TICK;

    for (const combo of combos) {
      const percentMods = combo.filter((u) => u.startsWith("P"));
      const fixedMods = combo.filter((u) => u.startsWith("F"));

      let percentTotal = percentMods.reduce((sum, u) => sum + percentageUpgrades[u], 0);
      let percentageResult = BASE_TICK * (1 - percentTotal);

      let fixedTotal = fixedMods.reduce((sum, u) => sum + fixedUpgrades[u], 0);
      let finalTick = percentageResult - fixedTotal;

      if (finalTick > 0 && finalTick < bestTime) {
        bestTime = finalTick;
        bestCombo = combo;
      }
    }

    if (bestCombo) {
      setSelected(bestCombo);
      setBestTick(Math.round(bestTime));
      calculateTicks(bestCombo);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg space-y-6 mt-10">
      <h1 className="text-3xl font-bold text-center">Tick Calculator</h1>
      <div className="space-y-2">
        {allUpgrades.map((upgrade) => (
          <div key={upgrade.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={upgrade.id}
              checked={selected.includes(upgrade.id)}
              onChange={() => toggleUpgrade(upgrade.id)}
              disabled={!selected.includes(upgrade.id) && selected.length >= 3}
            />
            <label htmlFor={upgrade.id}>{upgrade.label}</label>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <button onClick={() => calculateTicks()} className="px-4 py-2 bg-blue-600 text-white rounded">
          Calculate
        </button>
        <button onClick={getBestCombo} className="px-4 py-2 bg-green-600 text-white rounded">
          Best Combo
        </button>
      </div>

      {result !== null && (
        <div className="text-center text-xl">
          ✅ Final Tick: <strong>{result}</strong>
        </div>
      )}

      {tooFast && (
        <div className="text-red-600 text-center text-lg">
          ❌ Tick too low. Try different upgrades.
        </div>
      )}

      {bestTick && (
        <div className="text-center text-sm text-gray-500">
          💡 Best Possible Tick: {bestTick}
        </div>
      )}
    </div>
  );
}
