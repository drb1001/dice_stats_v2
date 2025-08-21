export function getDistribution(nDice, nSides) {
  if (nDice === 1) {
    return Array(nSides).fill(1 / nSides);
  }

  let dist = Array(nSides).fill(1 / nSides);

  for (let d = 2; d <= nDice; d++) {
    let newDist = Array(d * nSides - d + 1).fill(0);
    for (let i = 0; i < dist.length; i++) {
      for (let face = 1; face <= nSides; face++) {
        newDist[i + face - 1] += dist[i] * (1 / nSides);
      }
    }
    dist = newDist;
  }

  return dist;
}
