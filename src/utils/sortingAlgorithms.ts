import { SortStep } from '../types';

export function bubbleSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted: number[] = [];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapped: [], sorted: [...sorted] });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], comparing: [], swapped: [j, j + 1], sorted: [...sorted] });
      }
    }
    sorted.unshift(n - 1 - i);
  }
  sorted.unshift(0);
  steps.push({ array: [...a], comparing: [], swapped: [], sorted: Array.from({ length: n }, (_, i) => i) });
  return steps;
}

export function selectionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted: number[] = [];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...a], comparing: [minIdx, j], swapped: [], sorted: [...sorted] });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ array: [...a], comparing: [], swapped: [i, minIdx], sorted: [...sorted] });
    }
    sorted.push(i);
  }
  steps.push({ array: [...a], comparing: [], swapped: [], sorted: Array.from({ length: n }, (_, i) => i) });
  return steps;
}

export function insertionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const n = a.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      steps.push({ array: [...a], comparing: [j - 1, j], swapped: [], sorted: [] });
      [a[j], a[j - 1]] = [a[j - 1], a[j]];
      steps.push({ array: [...a], comparing: [], swapped: [j, j - 1], sorted: [] });
      j--;
    }
  }
  steps.push({ array: [...a], comparing: [], swapped: [], sorted: Array.from({ length: n }, (_, i) => i) });
  return steps;
}

export function mergeSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  function merge(arr: number[], l: number, m: number, r: number) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push({ array: [...arr], comparing: [l + i, m + 1 + j], swapped: [], sorted: [] });
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
      steps.push({ array: [...arr], comparing: [], swapped: [k - 1], sorted: [] });
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
  }

  function sort(arr: number[], l: number, r: number) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      sort(arr, l, m);
      sort(arr, m + 1, r);
      merge(arr, l, m, r);
    }
  }

  sort(a, 0, a.length - 1);
  steps.push({ array: [...a], comparing: [], swapped: [], sorted: Array.from({ length: a.length }, (_, i) => i) });
  return steps;
}

export function quickSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];

  function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ array: [...arr], comparing: [j, high], swapped: [], sorted: [] });
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ array: [...arr], comparing: [], swapped: [i, j], sorted: [] });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ array: [...arr], comparing: [], swapped: [i + 1, high], sorted: [] });
    return i + 1;
  }

  function sort(arr: number[], low: number, high: number) {
    if (low < high) {
      const pi = partition(arr, low, high);
      sort(arr, low, pi - 1);
      sort(arr, pi + 1, high);
    }
  }

  sort(a, 0, a.length - 1);
  steps.push({ array: [...a], comparing: [], swapped: [], sorted: Array.from({ length: a.length }, (_, i) => i) });
  return steps;
}

export function heapSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const n = a.length;

  function heapify(arr: number[], n: number, i: number) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n) {
      steps.push({ array: [...arr], comparing: [largest, l], swapped: [], sorted: [] });
      if (arr[l] > arr[largest]) largest = l;
    }
    if (r < n) {
      steps.push({ array: [...arr], comparing: [largest, r], swapped: [], sorted: [] });
      if (arr[r] > arr[largest]) largest = r;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({ array: [...arr], comparing: [], swapped: [i, largest], sorted: [] });
      heapify(arr, n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(a, n, i);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({ array: [...a], comparing: [], swapped: [0, i], sorted: [] });
    heapify(a, i, 0);
  }
  steps.push({ array: [...a], comparing: [], swapped: [], sorted: Array.from({ length: n }, (_, i) => i) });
  return steps;
}

export function getSortSteps(algorithm: string, arr: number[]): SortStep[] {
  switch (algorithm) {
    case 'bubble': return bubbleSort(arr);
    case 'selection': return selectionSort(arr);
    case 'insertion': return insertionSort(arr);
    case 'merge': return mergeSort(arr);
    case 'quick': return quickSort(arr);
    case 'heap': return heapSort(arr);
    default: return bubbleSort(arr);
  }
}
