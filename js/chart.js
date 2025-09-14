let chart;

export function initChart(ctx) {
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      elements: {
        line: { 
          tension: 0.1,
          fill: 'origin'
        }
      },
      plugins: {
        tooltip : { enabled: false },
        title: { display: false },
        legend: {
          display: true,
          position: 'top',
          labels: { boxHeight: 0 }
        }
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: val => (val * 100).toFixed(0) + '%'
          }
        }
      }
    }
  });
}

export function updateChart(labels, data) {
  chart.data.labels = labels;
  chart.data.datasets = data;
  chart.update();
}
