export function parseDiceSpec(spec) {
  console.log(`Parsing dice specification: "${spec}"`);
  const parts = spec.replace(/\s+/g, "").match(/([+-]?\d+d\d+(kh)?|[+-]?\d+)/gi);

  if (!parts) {
    console.log("No valid parts found in the input.");
    return null;
  }

  const groups = [];
  for (let part of parts) {
    console.log(`Processing part: "${part}"`);
    let diceMatch = part.match(/^([+-]?\d+)d(\d+)(kh)?$/i);
    if (diceMatch) {
      const nDice = parseInt(diceMatch[1], 10);
      const nSides = parseInt(diceMatch[2], 10);
      const modifier = diceMatch[3] || ''; // "kh" if present, otherwise empty string
      console.log(`Matched dice group: nDice=${nDice}, nSides=${nSides}, modifier="${modifier}"`);
      groups.push({ type: "dice", nDice, nSides, modifier, raw: part });
      continue;
    }

    let modMatch = part.match(/^([+-]?\d+)$/);
    if (modMatch) {
      const value = parseInt(modMatch[1], 10);
      console.log(`Matched modifier group: value=${value}`);
      groups.push({ type: "modifier", value, raw: part });
      continue;
    }

    console.log(`Invalid part detected: "${part}"`);
    return null; // invalid input
  }

  console.log("Parsed groups:", groups);
  return groups;
}