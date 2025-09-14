import { initChart } from './chart.js';
import { generate } from './ui.js';

function init() {
  console.log("Initializing chart and UI...");
  const ctx = document.getElementById('canvas').getContext('2d');
  initChart(ctx);

  document.getElementById('generate').addEventListener('click', generate);

  // Auto-generate on load
  console.log("Auto-generating distribution on page load...");
  generate();
}

init();
