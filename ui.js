/**
 * @jest-environment jsdom
 */

import { generateDistributions } from './distribution.js';
import { initChart, updateChart } from './chart.js';

function generate() {
  console.log("Starting distribution generation...");
  const spec1 = document.getElementById('diceSpec1').value;
  const spec2 = document.getElementById('diceSpec2').value;
  console.log(`Input specs: spec1 = "${spec1}", spec2 = "${spec2}"`);

  try {
    const { dist1, dist2, groups1, groups2 } = generateDistributions(spec1, spec2);
    console.log("Generated distributions:", { dist1, dist2 });
    console.log("Parsed groups:", { groups1, groups2 });

    const labels1 = Array.from(dist1.keys());
    const labels2 = Array.from(dist2.keys());
    console.log("Labels for distributions:", { labels1, labels2 });

    const labels = Array.from(new Set([...labels1, ...labels2])).sort((a, b) => a - b);
    const data1 = labels.map(label => dist1[label] || 0);
    const data2 = labels.map(label => dist2[label] || 0);
    console.log("Final labels and data:", { labels, data1, data2 });

    updateChart(labels, [
      { label: groups1.map(g => g.raw).join(""), data: data1, borderColor: 'rgba(54, 162, 235, 0.6)' },
      { label: groups2.map(g => g.raw).join(""), data: data2, borderColor: 'rgba(255, 99, 132, 0.6)' }
    ]);
  } catch (error) {
    console.error("Error during distribution generation:", error);
    alert(error.message);
  }
}

function init() {
  console.log("Initializing chart and UI...");
  const ctx = document.getElementById('chart').getContext('2d');
  initChart(ctx);

  document.getElementById('generate').addEventListener('click', generate);

  // Auto-generate on load
  console.log("Auto-generating distribution on page load...");
  generate();
}

init();
