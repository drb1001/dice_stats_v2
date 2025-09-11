let chart;

export function initChart(ctx) {
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: '',
          padding: 20
        },
        legend: {
          display: true,
          position: 'bottom',
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

export function updateChart(labels, data, titleText) {
  chart.data.labels = labels;
  chart.data.datasets = data;
  chart.options.plugins.title.text = titleText;
  chart.update();
}
