function plotGraph() {
    const xValues = document.getElementById('x-values').value.split(',').map(val => val.trim());
    const yValues = document.getElementById('y-values').value.split(',').map(val => val.trim());

    if (xValues.length !== yValues.length) {
        alert('X and Y values must have the same length');
        return;
    }

    const ctx = document.getElementById('graph-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'Sample Data',
                data: yValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
