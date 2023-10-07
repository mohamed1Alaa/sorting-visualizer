const arr = [];
let button = document.querySelector(".classbtn1");
let button2 = document.querySelector(".classbtn2");
let rangebar = document.querySelector(".classbtn4");
const rangeControl = document.getElementById("numbars");
const rangeControl2 = document.getElementById("speedbars");
let f;
let n = rangeControl.value;
let speed = rangeControl2.value;

let mymergesortArray = [];

rangeControl.addEventListener("input", function () {
  n = rangeControl.value;
  arr.splice(0,arr.length);
  f = 0;
  new_array();
});



rangeControl2.addEventListener("input", function () {
  speed = 105 - rangeControl2.value;
});
let copy = [];
let copy2 = [];



const quicksortswaps = [];
new_array();

function new_array(){
  
  for (let i = 0 ; i < n ; i++){
    arr[i] = Math.random(); 
  }
  showbars();
  for (let i = 0 ; i < n ; i++) copy2[i] = arr[i];
  while (mymergesortArray.length) mymergesortArray[0].shift();
}



function reset(){
  location.reload();
}

function sort(){
  
  button.disabled = true;
  button2.disabled = true;
  rangebar.disabled = true;
  
  const arrinsertionsort = [...arr];
  let swaps = [];
  let option = document.getElementById("option");
  
  if (option.value == "bubble sort") {
    swaps = bubblesort(copy);
  }
  else if (option.value == "quick sort"){
    quickSort(copy,0,copy.length-1);
    swaps = quicksortswaps;
  }
  else if (option.value == "selection sort"){
    swaps = selectionSort(copy);
  }
  else if (option.value == "merge sort"){
    mergeSort(0,n-1);
  }
  else if (option.value == "insertion sort"){
    swaps = insertionSort(copy);
  }
  if (option.value == "insertion sort"){
    animateinsertionsort(swaps,arrinsertionsort);
  }
  else if (option.value == "merge sort"){
   animatemergesort();
  }
  else{
    animate(swaps); 
  }
}

function partition(items, left, right){
  
  var pivot = items[Math.floor((right + left)/2)],i = left, j = right; 
  while (i <= j) {
    while (items[i] < pivot) i++;
    while (items[j] > pivot) j--;
    if (i <= j){
      quicksortswaps.push([i,j]);
      [items[i],items[j]] = [items[j],items[i]];
      i++;
      j--;
    }
  }
  return i;
}
function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right);
    if (left < index - 1) quickSort(items, left, index - 1);
    if (index < right)    quickSort(items, index, right);
  }
  return items;
}
function bubblesort(arr){
  const swaps = [];
  do{
    var swapped = false;
    for (let i = 1 ; i < arr.length ; i++){
      if (arr[i-1] > arr[i]){
        swapped = true;
        swaps.push([i-1,i]);
        [arr[i-1],arr[i]] = [arr[i],arr[i-1]];
      }
    }
  }while(swapped);
  return swaps;
}
function selectionSort(arr){ 
  const swaps = [];
  for(let i = 0; i < arr.length; i++){
    let min = i;
    for(let j = i+1; j < arr.length; j++){
      if(arr[j] < arr[min])
        min = j; 
    }
    if (min != i) {
      swaps.push([i,min]);
      [arr[i],arr[min]] = [arr[min],arr[i]];     
    }
  }
  return swaps;
}

function merge(start, end) {
  let mid = parseInt((start + end)/2);
  let iLeft = start,
      iRight = mid + 1,
      endLeft = mid,
      endRight = end;
  let iMain = start;
  while(iLeft <= endLeft && iRight <= endRight){
    if (copy2[iLeft] < copy2[iRight]) {
      copy[iMain++] = copy2[iLeft++];
    } else {
      copy[iMain++] = copy2[iRight++];
    }
  }
  while(iLeft <= endLeft){ copy[iMain++] = copy2[iLeft++];}

  while(iRight <= endRight) {copy[iMain++] = copy2[iRight++];}

  iMain = start;
  while(iMain <= end){
    mymergesortArray.push([iMain,copy[iMain]]);
    copy2[iMain] = copy[iMain];
    iMain++;
  }
}
function mergeSort(start , end){
  if (start< end) {
    let mid = parseInt((start + end)/2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, end);
  }
}

function animatemergesort(){
  if (mymergesortArray.length == 0){
    button.disabled = false;
    button2.disabled = false;
    rangebar.disabled = false;
    return;
  }
  const [i,j] = mymergesortArray.shift();
  //if (i != null && j != null)
    arr[i] = j;
 
  showbars();
  setTimeout(function(){
    animatemergesort();
  },speed);
}

function insertionSort(arr){
  const swaps = [];
  for (let i = 1; i < n; i++){
    let key = arr[i];
    let j = i-1;
    
    while (j >= 0 && arr[j] > key){
      arr[j + 1] = arr[j];
      swaps.push([j,j+1,-1]);
      j--;
    }
    swaps.push([i,j+1,key]);
    arr[j + 1] = key;
  }
  return swaps;
}
function animateinsertionsort(swaps,arrinsertionsort){
  
  if (swaps.length == 0 ){
    button.disabled = false;
    button2.disabled = false;
    rangebar.disabled = false;
    return;
  }
  const [i,j,k] = swaps.shift();
  if (k == -1) arr[j] = arr[i];
  else arr[j] = k;
  
  showbars();
  setTimeout(function(){
    animateinsertionsort(swaps,arrinsertionsort);
  },speed);
}
function animate(swaps){
  
  // bubble sort
  if (swaps.length == 0 ){
    button.disabled = false;
    button2.disabled = false;
    rangebar.disabled = false;
    return;
  }
  const [i,j] = swaps.shift();
  [arr[i],arr[j]] = [arr[j],arr[i]];
  showbars();
  setTimeout(function(){
    animate(swaps);
  },speed);
}

function showbars(){
  container.innerHTML="";
  for (let i = 0 ;i < arr.length ; i++){
    const bar = document.createElement("div");
    bar.style.height = arr[i]*100+"%";
    bar.style.width = (n/100)*100+"%";
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}







