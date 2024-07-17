document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('file-upload').addEventListener('change', handleFileUpload);
});

let chart;

function plotGraph() {
    const xValues = document.getElementById('x-values').value.split(',').map(val => val.trim());
    const yValues = document.getElementById('y-values').value.split(',').map(val => val.trim());
    const graphType = document.getElementById('graph-type').value;
    const graphTitle = document.getElementById('graph-title').value;
    const backgroundColor = document.getElementById('background-color').value;
    const borderColor = document.getElementById('border-color').value;

    if (!validateInputs(xValues, yValues)) {
        return;
    }

    const ctx = document.getElementById('graph-canvas').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: graphType,
        data: {
            labels: xValues,
            datasets: [{
                label: graphTitle || 'Sample Data',
                data: yValues,
                backgroundColor: graphType === 'pie' ? getPieColors(yValues.length) : backgroundColor,
                borderColor: graphType === 'pie' ? 'rgba(75, 192, 192, 1)' : borderColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: graphTitle
                }
            },
            scales: {
                x: graphType !== 'pie' ? { beginAtZero: true } : undefined,
                y: graphType !== 'pie' ? { beginAtZero: true } : undefined
            }
        }
    });

    document.getElementById('export-button').style.display = 'block';
}

function validateInputs(xValues, yValues) {
    if (xValues.length === 0 || yValues.length === 0) {
        displayError('X and Y values cannot be empty');
        return false;
    }

    if (xValues.length !== yValues.length) {
        displayError('X and Y values must have the same length');
        return false;
    }

    if (xValues.some(val => isNaN(val)) || yValues.some(val => isNaN(val))) {
        displayError('X and Y values must be numeric');
        return false;
    }

    return true;
}

function displayError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
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

function getPieColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`hsl(${(i / count) * 360}, 100%, 50%)`);
    }
    return colors;
}

function exportGraph() {
    const link = document.createElement('a');
    link.href = document.getElementById('graph-canvas').toDataURL('image/png');
    link.download = 'graph.png';
    link.click();
}
