function calculateStats() {
    let input = document.getElementById('numbers').value;
    let numbers = input.split(',').map(Number);
    
    let mean = getMean(numbers);
    let median = getMedian(numbers);
    let mode = getMode(numbers);
    let stdDev = getStandardDeviation(numbers);
    let range = getRange(numbers);
    let skewness = getSkewness(numbers);

    document.getElementById('mean').innerText = mean.toFixed(2);
    document.getElementById('median').innerText = median;
    document.getElementById('mode').innerText = mode.length ? mode.join(', ') : 'No mode';
    document.getElementById('stdDev').innerText = stdDev.toFixed(2);
    document.getElementById('range').innerText = range;
    document.getElementById('skewness').innerText = skewness.toFixed(2);
}

function getMean(numbers) {
    let sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
}

function getMedian(numbers) {
    numbers.sort((a, b) => a - b);
    let mid = Math.floor(numbers.length / 2);
    return numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
}

function getMode(numbers) {
    let frequency = {};
    let maxFreq = 0;
    let modes = [];

    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) maxFreq = frequency[num];
    });

    for (let num in frequency) {
        if (frequency[num] === maxFreq && maxFreq > 1) modes.push(num);
    }

    return modes;
}

function getStandardDeviation(numbers) {
    let mean = getMean(numbers);
    let variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
    return Math.sqrt(variance);
}

function getRange(numbers) {
    return Math.max(...numbers) - Math.min(...numbers);
}

function getSkewness(numbers) {
    let mean = getMean(numbers);
    let stdDev = getStandardDeviation(numbers);
    let skewness = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 3), 0) / numbers.length;
    return skewness / Math.pow(stdDev, 3);
}
