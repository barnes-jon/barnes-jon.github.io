document.getElementById('imageInput').addEventListener('change', loadImage);
document.getElementById('processButton').addEventListener('click', processImage);
document.getElementById('downloadJPEG').addEventListener('click', downloadJPEG);
document.getElementById('downloadRaw').addEventListener('click', downloadRaw);

let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d');
let image = new Image();

function loadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        image.onload = function() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        image.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function processImage() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    // Apply Sobel operator
    let grayscale = toGrayscale(data);
    let sobelData = sobelFilter(grayscale, canvas.width, canvas.height, 50); // Adjust sensitivity here

    // Draw outlines on canvas
    drawOutlines(sobelData);

    // Remove any existing tables
    let existingTables = document.querySelectorAll('table');
    existingTables.forEach(table => table.remove());

    // Calculate average pixel value within shapes and color them
    calculateAveragePixelValue(sobelData);
}

function toGrayscale(data) {
    let grayscale = new Uint8ClampedArray(data.length / 4);
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        grayscale[i / 4] = avg;
    }
    return grayscale;
}

function sobelFilter(data, width, height, sensitivity = 128) {
    let kernelX = [
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
    ];
    let kernelY = [
        -1, -2, -1,
         0,  0,  0,
         1,  2,  1
    ];

    let sobelData = new Uint8ClampedArray(data.length);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let pixelX = (
                (kernelX[0] * data[((y - 1) * width + (x - 1))]) +
                (kernelX[1] * data[((y - 1) * width + x)]) +
                (kernelX[2] * data[((y - 1) * width + (x + 1))]) +
                (kernelX[3] * data[(y * width + (x - 1))]) +
                (kernelX[4] * data[(y * width + x)]) +
                (kernelX[5] * data[(y * width + (x + 1))]) +
                (kernelX[6] * data[((y + 1) * width + (x - 1))]) +
                (kernelX[7] * data[((y + 1) * width + x)]) +
                (kernelX[8] * data[((y + 1) * width + (x + 1))])
            );

            let pixelY = (
                (kernelY[0] * data[((y - 1) * width + (x - 1))]) +
                (kernelY[1] * data[((y - 1) * width + x)]) +
                (kernelY[2] * data[((y - 1) * width + (x + 1))]) +
                (kernelY[3] * data[(y * width + (x - 1))]) +
                (kernelY[4] * data[(y * width + x)]) +
                (kernelY[5] * data[(y * width + (x + 1))]) +
                (kernelY[6] * data[((y + 1) * width + (x - 1))]) +
                (kernelY[7] * data[((y + 1) * width + x)]) +
                (kernelY[8] * data[((y + 1) * width + (x + 1))])
            );

            let magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)) >>> 0;

            sobelData[y * width + x] = (magnitude > sensitivity) ? 255 : 0;
        }
    }

    return sobelData;
}

function drawOutlines(data) {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let output = imageData.data;

    for (let i = 0; i < data.length; i++) {
        let value = data[i];
        output[i * 4] = value;
        output[i * 4 + 1] = value;
        output[i * 4 + 2] = value;
        output[i * 4 + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
}

function calculateAveragePixelValue(data) {
    let width = canvas.width;
    let height = canvas.height;
    let visited = new Uint8Array(data.length);
    let shapes = [];
    
    const colors = [
        [255, 0, 0], [0, 255, 0], [0, 0, 255],
        [255, 255, 0], [255, 0, 255], [0, 255, 255],
        [128, 0, 0], [0, 128, 0], [0, 0, 128], [128, 128, 0]
    ];

    function floodFill(x, y, shape) {
        let stack = [[x, y]];

        while (stack.length > 0) {
            let [cx, cy] = stack.pop();
            let idx = (cy * width + cx);

            if (visited[idx] || data[idx] === 0) continue;

            visited[idx] = 1;
            shape.push([cx, cy]);

            if (cx > 0) stack.push([cx - 1, cy]);
            if (cy > 0) stack.push([cx, cy - 1]);
            if (cx < width - 1) stack.push([cx + 1, cy]);
            if (cy < height - 1) stack.push([cx, cy + 1]);
        }
    }

    // Detect shapes using flood fill
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (y * width + x);
            if (data[index] > 0 && !visited[index]) {
                let shape = [];
                floodFill(x, y, shape);
                shapes.push(shape);
            }
        }
    }

    // Prepare table
    let table = document.createElement('table');
    table.style.fontSize = '10px';
    table.style.marginTop = '10px';
    let headerRow = table.insertRow();
    headerRow.insertCell().innerText = 'Polygon #';
    headerRow.insertCell().innerText = 'Average R';
    headerRow.insertCell().innerText = 'Average G';
    headerRow.insertCell().innerText = 'Average B';

    // Calculate average pixel value for each shape and label polygons
    shapes.forEach((shape, shapeIndex) => {
        let totalR = 0, totalG = 0, totalB = 0;
        let centroidX = 0, centroidY = 0;

        shape.forEach(([x, y]) => {
            let idx = (y * width + x) * 4;
            totalR += image.data[idx];
            totalG += image.data[idx + 1];
            totalB += image.data[idx + 2];
            centroidX += x;
            centroidY += y;
        });

        let avgR = totalR / shape.length;
        let avgG = totalG / shape.length;
        let avgB = totalB / shape.length;

        centroidX = Math.round(centroidX / shape.length);
        centroidY = Math.round(centroidY / shape.length);

        // Label the polygon on the canvas
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        ctx.fillText(shapeIndex + 1, centroidX, centroidY);

        // Color the shape
        let color = colors[shapeIndex % colors.length];
        shape.forEach(([x, y]) => {
            let idx = (y * width + x) * 4;
            ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            ctx.fillRect(x, y, 1, 1);
        });

        // Add row to the table
        let row = table.insertRow();
        row.insertCell().innerText = shapeIndex + 1;
        row.insertCell().innerText = avg
}


// This function will convert the raw pixel data to a suitable format
function convertRawDataToFormat(data, width, height) {
    let formattedData = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < data.length; i++) {
        let idx = i * 4;
        formattedData[idx] = data[i]; // Red
        formattedData[idx + 1] = data[i]; // Green
        formattedData[idx + 2] = data[i]; // Blue
        formattedData[idx + 3] = 255; // Alpha
    }
    return formattedData;
}

// Create and download a raw image file
function downloadRaw() {
    let rawData = new Uint8Array(canvas.width * canvas.height);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rawData.length; i++) {
        rawData[i] = imageData.data[i * 4]; // Take red channel value
    }

    let blob = new Blob([rawData], { type: 'application/octet-stream' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'outlines.raw';
    link.click();
}

// Create and download a JPEG image file
function downloadJPEG() {
    let link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'outlines.jpg';
    link.click();
}

// Initialize
document.getElementById('imageInput').addEventListener('change', loadImage);
document.getElementById('processButton').addEventListener('click', processImage);
document.getElementById('downloadJPEG').addEventListener('click', downloadJPEG);
document.getElementById('downloadRaw').addEventListener('click', downloadRaw);

let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d');
let image = new Image();

function loadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        image.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function processImage() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    // Apply Sobel operator
    let grayscale = toGrayscale(data);
    let sobelData = sobelFilter(grayscale, canvas.width, canvas.height, 50); // Adjust sensitivity here

    // Draw outlines on canvas
    drawOutlines(sobelData);

    // Remove any existing tables
    let existingTables = document.querySelectorAll('table');
    existingTables.forEach(table => table.remove());

    // Calculate average pixel value within shapes and color them
    calculateAveragePixelValue(sobelData);
}

function toGrayscale(data) {
    let grayscale = new Uint8ClampedArray(data.length / 4);
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        grayscale[i / 4] = avg;
    }
    return grayscale;
}

function sobelFilter(data, width, height, sensitivity = 128) {
    let kernelX = [
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
    ];
    let kernelY = [
        -1, -2, -1,
         0,  0,  0,
         1,  2,  1
    ];

    let sobelData = new Uint8ClampedArray(data.length);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let pixelX = (
                (kernelX[0] * data[((y - 1) * width + (x - 1))]) +
                (kernelX[1] * data[((y - 1) * width + x)]) +
                (kernelX[2] * data[((y - 1) * width + (x + 1))]) +
                (kernelX[3] * data[(y * width + (x - 1))]) +
                (kernelX[4] * data[(y * width + x)]) +
                (kernelX[5] * data[(y * width + (x + 1))]) +
                (kernelX[6] * data[((y + 1) * width + (x - 1))]) +
                (kernelX[7] * data[((y + 1) * width + x)]) +
                (kernelX[8] * data[((y + 1) * width + (x + 1))])
            );

            let pixelY = (
                (kernelY[0] * data[((y - 1) * width + (x - 1))]) +
                (kernelY[1] * data[((y - 1) * width + x)]) +
                (kernelY[2] * data[((y - 1) * width + (x + 1))]) +
                (kernelY[3] * data[(y * width + (x - 1))]) +
                (kernelY[4] * data[(y * width + x)]) +
                (kernelY[5] * data[(y * width + (x + 1))]) +
                (kernelY[6] * data[((y + 1) * width + (x - 1))]) +
                (kernelY[7] * data[((y + 1) * width + x)]) +
                (kernelY[8] * data[((y + 1) * width + (x + 1))])
            );

            let magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)) >>> 0;

            sobelData[y * width + x] = (magnitude > sensitivity) ? 255 : 0;
        }
    }

    return sobelData;
}

function drawOutlines(data) {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let output = imageData.data;

    for (let i = 0; i < data.length; i++) {
        let value = data[i];
        output[i * 4] = value;
        output[i * 4 + 1] = value;
        output[i * 4 + 2] = value;
        output[i * 4 + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
}

function calculateAveragePixelValue(data) {
    let width = canvas.width;
    let height = canvas.height;
    let visited = new Uint8Array(data.length);
    let shapes = [];
    
    const colors = [
        [255, 0, 0], [0, 255, 0], [0, 0, 255],
        [255, 255, 0], [255, 0, 255], [0, 255, 255],
        [128, 0, 0], [0, 128, 0], [0, 0, 128], [128, 128, 0]
    ];

    function floodFill(x, y, shape) {
        let stack = [[x, y]];

        while (stack.length > 0) {
            let [cx, cy] = stack.pop();
            let idx = (cy * width + cx);

            if (visited[idx] || data[idx] === 0) continue;

            visited[idx] = 1;
            shape.push([cx, cy]);

            if (cx > 0) stack.push([cx - 1, cy]);
            if (cy > 0) stack.push([cx, cy - 1]);
            if (cx < width - 1) stack.push([cx + 1, cy]);
            if (cy < height - 1) stack.push([cx, cy + 1]);
        }
    }

    // Detect shapes using flood fill
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (y * width + x);
            if (data[index] > 0 && !visited[index]) {
                let shape = [];
                floodFill(x, y, shape);
                shapes.push(shape);
            }
        }
    }

    // Prepare table
    let table = document.createElement('table');
    table.style.fontSize = '10px';
    table.style.marginTop = '10px';
    let headerRow = table.insertRow();
    headerRow.insertCell().innerText = 'Polygon #';
    headerRow.insertCell().innerText = 'Average R';
    headerRow.insertCell().innerText = 'Average G';
    headerRow.insertCell().innerText = 'Average B';

    // Calculate average pixel value for each shape and label polygons
    shapes.forEach((shape, shapeIndex) => {
        let totalR = 0, totalG = 0, totalB = 0, count = shape.length;
        shape.forEach(([x, y]) => {
            let idx = (y * width + x) * 4;
            totalR += imageData.data[idx];
            totalG += imageData.data[idx + 1];
            totalB += imageData.data[idx + 2];
        });

        let avgR = totalR / count;
        let avgG = totalG / count;
        let avgB = totalB / count;

        // Add row to table
        let row = table.insertRow();
        row.insertCell().innerText = shapeIndex + 1;
        row.insertCell().innerText = avgR.toFixed(2);
        row.insertCell().innerText = avgG.toFixed(2);
        row.insertCell().innerText = avgB.toFixed(2);

        // Color the shape with an average color
        let color = colors[shapeIndex % colors.length];
        shape.forEach(([x, y]) => {
            let idx = (y * width + x) * 4;
            output[idx] = color[0];
            output[idx + 1] = color[1];
            output[idx + 2] = color[2];
            output[idx + 3] = 255;
        });
    });

    // Update canvas with colored shapes
    ctx.putImageData(imageData, 0, 0);

    // Append table to document
    document.body.appendChild(table);
}