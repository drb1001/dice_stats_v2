export function getDistribution(nDice, nSides, modifier = '') {
  console.log(`Generating distribution for nDice: ${nDice}, nSides: ${nSides}, modifier: '${modifier}'`);

  // handle the simple case for 1 die  
  if (nDice === 1) {
    console.log(`Single die detected. Generating uniform distribution.`);
    return [0].concat(Array(nSides).fill(1 / nSides));
  }

  // handle the case for 2 dice with keep highest
  if ((modifier === 'kh'  || modifier === 'dl') && nDice === 2) {
    console.log(`Applying 'keep highest' logic for 2 dice.`);
    let dist = [0].concat(Array(nSides).fill(1 / nSides));
    let newDist = Array(dist.length).fill(0);

    for (let i = 0; i < dist.length; i++) {
      for (let j = 0; j < dist.length; j++) {
        const highest = Math.max(i, j);
        newDist[highest] += dist[i] * dist[j];
      }
    }

    console.log(`Resulting distribution:`, newDist);
    return newDist;
  }

  // handle the case for 2 dice with keep lowest
  if ((modifier === 'kl' || modifier === 'dh') && nDice === 2) {
    console.log(`Applying 'keep lowest' logic for 2 dice.`);
    let dist = [0].concat(Array(nSides).fill(1 / nSides));
    let newDist = Array(dist.length).fill(0);

    for (let i = 0; i < dist.length; i++) {
      for (let j = 0; j < dist.length; j++) {
        const highest = Math.min(i, j);
        newDist[highest] += dist[i] * dist[j];
      }
    }

    console.log(`Resulting distribution:`, newDist);
    return newDist;
  }


  let dist = [0].concat(Array(nSides).fill(1 / nSides));

  // handle the case for more than 2 dice
  for (let d = 2; d <= nDice; d++) {
    let newDist = Array(dist.length + nSides).fill(0);  // maximum sum is maximum of previous + nSides
    for (let i = 0; i < dist.length; i++) {
      for (let j = 0; j < nSides; j++) {
        newDist[i + j + 1] += dist[i] * (1 / nSides);   // include +1 because distributions are 0-indexed
      } 
    }
    dist = newDist;
    console.log(`Distribution after rolling ${d} dice:`, dist);
  } 

  console.log(`Final distribution for ${nDice} dice:`, dist);
  return dist;
}
