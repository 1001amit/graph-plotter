document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('file-upload').addEventListener('change', handleFileUpload);
});

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

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        processCSVData(text);
    };

    reader.readAsText(file);
}

function processCSVData(data) {
    const lines = data.split('\n');
    const xValues = [];
    const yValues = [];

    lines.forEach(line => {
        const [x, y] = line.split(',').map(val => val.trim());
        if (x && y) {
            xValues.push(x);
            yValues.push(y);
        }
    });

    document.getElementById('x-values').value = xValues.join(',');
    document.getElementById('y-values').value = yValues.join(',');
}
