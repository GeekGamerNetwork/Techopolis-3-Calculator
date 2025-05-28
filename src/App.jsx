import React, { useState } from "react";

import logo from "/638742658199097356.png";

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        padding: "2rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="max-w-xl mx-auto"
        style={{
          background: "#fff",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          padding: "2.5rem 2rem",
          marginTop: "3rem",
          width: "90vw",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem", width: "100%" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "clamp(96px, 18vw, 160px)",
              maxWidth: "100%",
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>
        <h1
          className="text-3xl font-bold text-center"
          style={{
            fontSize: "clamp(2rem, 5vw, 2.7rem)",
            fontWeight: 700,
            color: "#3730a3",
            marginBottom: "2rem",
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          Tick Calculator
        </h1>
        <div
          className="space-y-2"
          style={{
            marginBottom: "1.5rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {allUpgrades.map((upgrade) => (
            <div
              key={upgrade.id}
              className="flex items-center space-x-2"
              style={{
                background: selected.includes(upgrade.id)
                  ? "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)"
                  : "#f1f5f9",
                borderRadius: "0.75rem",
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
                transition: "background 0.2s",
                color: selected.includes(upgrade.id) ? "#fff" : "#334155",
                fontWeight: selected.includes(upgrade.id) ? 600 : 400,
                boxShadow: selected.includes(upgrade.id)
                  ? "0 2px 8px rgba(99, 102, 241, 0.10)"
                  : "none",
                width: "100%",
                maxWidth: "340px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="checkbox"
                id={upgrade.id}
                checked={selected.includes(upgrade.id)}
                onChange={() => toggleUpgrade(upgrade.id)}
                disabled={!selected.includes(upgrade.id) && selected.length >= 3}
                style={{
                  accentColor: "#6366f1",
                  width: "1.3em",
                  height: "1.3em",
                  marginRight: "0.7em",
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor={upgrade.id}
                style={{
                  cursor:
                    !selected.includes(upgrade.id) && selected.length >= 3
                      ? "not-allowed"
                      : "pointer",
                  userSelect: "none",
                  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                }}
              >
                {upgrade.label}
              </label>
            </div>
          ))}
        </div>

        <div
          className="flex gap-4 justify-center"
          style={{
            marginBottom: "1.5rem",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => calculateTicks()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            style={{
              background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.75rem 2rem",
              fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(99, 102, 241, 0.15)",
              transition: "background 0.2s",
              width: "min(48vw, 180px)",
              minWidth: "120px",
              textAlign: "center",
            }}
          >
            Calculate
          </button>
          <button
            onClick={getBestCombo}
            className="px-4 py-2 bg-green-600 text-white rounded"
            style={{
              background: "linear-gradient(90deg, #22c55e 0%, #4ade80 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.75rem 2rem",
              fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(34, 197, 94, 0.12)",
              transition: "background 0.2s",
              width: "min(48vw, 180px)",
              minWidth: "120px",
              textAlign: "center",
            }}
          >
            Best Combo
          </button>
        </div>

        {result !== null && (
          <div
            className="text-center text-xl"
            style={{
              color: "#16a34a",
              fontSize: "clamp(1.2rem, 3vw, 1.7rem)",
              fontWeight: 600,
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            ✅ Final Tick: <strong>{result}</strong>
          </div>
        )}

        {tooFast && (
          <div
            className="text-red-600 text-center text-lg"
            style={{
              color: "#dc2626",
              fontWeight: 500,
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            ❌ Tick too low. Try different upgrades.
          </div>
        )}

        {bestTick && (
          <div
            className="text-center text-sm text-gray-500"
            style={{
              color: "#64748b",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            💡 Best Possible Tick: {bestTick}
          </div>
        )}
      </div>
    </div>
  );
}
