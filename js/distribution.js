import { parseDiceSpec } from './parser.js';
import { getDistribution } from './dice.js';

export function shiftDistribution(dist, shift) {
  console.log(`Shifting distribution by ${shift}. Original distribution:`, dist);
  if (shift === 0) return dist;
  if (shift > 0) {
    return Array(shift).fill(0).concat(dist);
  } else {
    return dist.slice(-shift); // remove first |shift| elements
  }
}

export function processGroups(groups) {
  console.log(`Processing groups:`, groups);
  let dist = [1];

  for (let g of groups) {
    if (g.type === "dice") {
      console.log(`Processing dice group:`, g);
      const groupDist = getDistribution(g.nDice, g.nSides, g.modifier);
      let newDist = Array(dist.length + groupDist.length - 1).fill(0);
      for (let i = 0; i < dist.length; i++) {
        for (let j = 0; j < groupDist.length; j++) {
          newDist[i + j] += dist[i] * groupDist[j];
        }
      }
      dist = newDist;
    } else if (g.type === "modifier") {
      console.log(`Processing modifier group:`, g);
      dist = shiftDistribution(dist, g.value);
    }
  }

  console.log(`Final distribution after processing groups:`, dist);
  return dist;
}

export function generateDistributions(spec1, spec2) {
  console.log(`Generating distributions for inputs: "${spec1}" and "${spec2}"`);

  const groups1 = parseDiceSpec(spec1);
  const groups2 = parseDiceSpec(spec2);

  if (!groups1 || !groups2) {
    console.log("Invalid input detected. Aborting generation.");
    throw new Error("Invalid input! Examples: 2d6kh+3 or 2d4kh+4d2+2d6kh.");
  }

  const dist1 = processGroups(groups1);
  const dist2 = processGroups(groups2);

  return { dist1, dist2, groups1, groups2 };
}