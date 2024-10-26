const arrayContainer = document.getElementById('array-container');
const algorithmSelect = document.getElementById('algorithm-select');
const generateBtn = document.getElementById('generate-btn');
const sortBtn = document.getElementById('sort-btn');
const timeComplexity = document.getElementById('time-complexity');
const spaceComplexity = document.getElementById('space-complexity');

let array = [];

// Generate a random array
function generateArray(size = 30) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    displayArray();
}

// Display the array as bar charts with values on top
function displayArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`; // Adjust height for visibility
        bar.innerHTML = `<span>${value}</span>`;
        arrayContainer.appendChild(bar);
    });
}

// Swap helper function
function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    displayArray();
}

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                await delay(100);
            }
        }
    }
}

// Insertion Sort
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            displayArray();
            await delay(100);
        }
        array[j + 1] = key;
        displayArray();
        await delay(100);
    }
}

// Merge Sort
async function mergeSort(arr = array, start = 0, end = array.length - 1) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSort(arr, start, mid);
        await mergeSort(arr, mid + 1, end);
        await merge(arr, start, mid, end);
    }
}

async function merge(arr, start, mid, end) {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
        displayArray();
        await delay(100);
    }

    while (i < left.length) {
        arr[k++] = left[i++];
        displayArray();
        await delay(100);
    }

    while (j < right.length) {
        arr[k++] = right[j++];
        displayArray();
        await delay(100);
    }
}

// Quick Sort (for completeness)
async function quickSort(arr = array, low = 0, high = array.length - 1) {
    if (low < high) {
        let pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
            await delay(100);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}

// Delay helper function for visualization
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Event listeners
generateBtn.addEventListener('click', () => generateArray());
sortBtn.addEventListener('click', () => {
    const algorithm = algorithmSelect.value;
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            timeComplexity.textContent = 'O(n^2)';
            spaceComplexity.textContent = 'O(1)';
            break;
        case 'insertionSort':
            insertionSort();
            timeComplexity.textContent = 'O(n^2)';
            spaceComplexity.textContent = 'O(1)';
            break;
        case 'mergeSort':
            mergeSort();
            timeComplexity.textContent = 'O(n log n)';
            spaceComplexity.textContent = 'O(n)';
            break;
        case 'quickSort':
            quickSort();
            timeComplexity.textContent = 'O(n log n)';
            spaceComplexity.textContent = 'O(log n)';
            break;
    }
});

// Generate an initial array on page load
generateArray();
