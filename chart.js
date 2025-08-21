let chart;

export function initChart(ctx) {
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Probability',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '' // updated dynamically
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: val => (val * 100).toFixed(1) + '%'
          }
        }
      }
    }
  });
}

export function updateChart(labels, data, titleText) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.options.plugins.title.text = titleText;
  chart.update();
}
