let button        = document.querySelector(".classbtn1");
let button2       = document.querySelector(".classbtn2");
let rangebar      = document.querySelector(".classbtn4");
let rangeControl  = document.getElementById("numbars");
let rangeControl2 = document.getElementById("speedbars");
let n = rangeControl.value;
let speed = rangeControl2.value;
let arr = [];
let copymerge = [];
let quicksortswaps = [];
let mymergesortArray = [];
let copy2 = [];
let swaps = [];
let copy = [...arr];
let arrinsertionsort = [...arr];


rangeControl.addEventListener("input", function () {
  n = rangeControl.value;
  arr.splice(0,arr.length);
  new_array();
});

rangeControl2.addEventListener("input", function () {
  speed = 105 - rangeControl2.value;
});

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

new_array();

function new_array(){
  
  for (let i = 0 ; i < n ; i++){
    arr[i] = Math.random(); 
  }
  showbars();
}

function reset(){
  location.reload();
}

function is_sorted(){
  for (let i = 0 ; i < n-1 ; i++){
    if (arr[i] > arr[i+1]){
      return false;
    }
  }
  return true;
}

function sort(){
  if (is_sorted() == true) return;
  copy = [...arr];
  arrinsertionsort = [...arr];
  swaps = [];
  copy2 = [...arr];
  mymergesortArray = [];
  let statusofanaimation = 1;
  button.disabled = true;
  button2.disabled = true;
  rangebar.disabled = true;

  let option = document.getElementById("option");
  
  if (option.value == "bubble sort") {
    bubblesort(copy);
  }
  else if (option.value == "quick sort"){
    quickSort(copy,0,copy.length-1);
  }
  else if (option.value == "selection sort"){
    selectionSort(copy);
  }
  else if (option.value == "merge sort"){
    statusofanaimation = 2;
    mergeSort(0,n-1);
  }
  else if (option.value == "insertion sort"){
    statusofanaimation = 3;
    insertionSort(copy);
  }
  animate(statusofanaimation);
}

function animate(status){
  if (swaps.length == 0 ){
    button.disabled = false;
    button2.disabled = false;
    rangebar.disabled = false;
    return;
  }
  if (status == 1){
    const [i,j] = swaps.shift();
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  else if (status == 2){
    const [i,j] = swaps.shift();
    arr[i] = j;
  }
  else{
    const [i,j,k] = swaps.shift();
    if (k == -1) arr[j] = arr[i];
    else arr[j] = k;
  }
  showbars();
  setTimeout(function(){
    animate(status);
  },speed);
}

function bubblesort(arr){
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
}

function partition(items, left, right) {
  let pivot = items[Math.floor((right + left)/2)],i = left, j = right; 
  while (i <= j) {
    while (items[i] < pivot) i++;
    while (items[j] > pivot) j--;
    if (i <= j){
      swaps.push([i,j]);
      [items[i],items[j]] = [items[j],items[i]];
      i++;
      j--;
    }
  }
  return i;
}
function quickSort(items, left, right) {
  let index;
  if (items.length > 1) {
      index = partition(items, left, right);
      if (left < index - 1) 
          quickSort(items, left, index - 1);
      if (index < right)    
          quickSort(items, index, right);
  }
  return items;
}

function selectionSort(arr){ 
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
      copymerge[iMain++] = copy2[iLeft++];
    } 
    else {
      copymerge[iMain++] = copy2[iRight++];
    }
  }
  while(iLeft <= endLeft){ copymerge[iMain++] = copy2[iLeft++];}
  while(iRight <= endRight) {copymerge[iMain++] = copy2[iRight++];}

  iMain = start;
  while(iMain <= end){
    swaps.push([iMain,copymerge[iMain]]);
    copy2[iMain] = copymerge[iMain];
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

function insertionSort(arr) {
  for (let i = 1; i < n; i++){
    let key = arr[i],j = i-1;
    while (j >= 0 && arr[j] > key){
      arr[j + 1] = arr[j];
      swaps.push([j,j+1,-1]);
      j--;
    }
    swaps.push([i,j+1,key]);
    arr[j + 1] = key;
  }
}
