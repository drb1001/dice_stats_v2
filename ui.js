import { getDistribution } from './dice.js';
import { initChart, updateChart } from './chart.js';

function parseDiceSpec(spec) {
  const parts = spec.replace(/\s+/g, "").match(/([+-]?\d+d\d+|[+-]?\d+)/gi);

  if (!parts) return null;

  const groups = [];
  for (let part of parts) {
    let diceMatch = part.match(/^([+-]?\d+)d(\d+)$/i);
    if (diceMatch) {
      const nDice = parseInt(diceMatch[1], 10);
      const nSides = parseInt(diceMatch[2], 10);
      groups.push({ type: "dice", nDice, nSides, raw: part });
      continue;
    }

    let modMatch = part.match(/^([+-]?\d+)$/);
    if (modMatch) {
      const value = parseInt(modMatch[1], 10);
      groups.push({ type: "modifier", value, raw: part });
      continue;
    }

    return null; // invalid input
  }

  return groups;
}

function shiftDistribution(dist, shift) {
  if (shift === 0) return dist;
  if (shift > 0) {
    return Array(shift).fill(0).concat(dist);
  } else {
    return dist.slice(-shift); // remove first |shift| elements
  }
}

function generate() {
  const spec = document.getElementById('diceSpec').value;
  const groups = parseDiceSpec(spec);

  if (!groups) {
    alert("Invalid input! Examples: 2d6+1d8+3 or 1d20-2.");
    return;
  }

  // Start with trivial distribution [100% at sum = 0]
  let dist = [1];

  // Apply each group
  for (let g of groups) {
    if (g.type === "dice") {
      const groupDist = getDistribution(g.nDice, g.nSides);
      let newDist = Array(dist.length + groupDist.length - 1).fill(0);
      for (let i = 0; i < dist.length; i++) {
        for (let j = 0; j < groupDist.length; j++) {
          newDist[i + j] += dist[i] * groupDist[j];
        }
      }
      dist = newDist;
    } else if (g.type === "modifier") {
      dist = shiftDistribution(dist, g.value);
    }
  }

  // Find minimum valid sum (first non-zero index)
  let minSum = dist.findIndex(p => p > 0);
  const labels = Array.from({ length: dist.length - minSum }, (_, i) => i + minSum);

  // Build title string from input
  const titleText = "Distribution for: " + groups.map(g => g.raw).join(" ");

  updateChart(labels, dist.slice(minSum), titleText);
}

function init() {
  const ctx = document.getElementById('chart').getContext('2d');
  initChart(ctx);

  document.getElementById('generate').addEventListener('click', generate);

  // Auto-generate on load
  generate();
}

init();
