//Задача 1.1
function MaxRange(arr){
    arr.sort((a, b) => a - b);
    let result = arr.pop()-arr.shift();
    return result
}

const list = [1, 4, 34, 1, 20, 6, 6, 12, 8, 6];
console.log(MaxRange(list))

//Задача 1.2
function NonRepeat(arr){
    return [...new Set(arr)];
}

console.log(NonRepeat([1, 2, 2, 3, 4, 4, 5])); 

//Задача 1.3
const data = [
    {id: 1, isDone: true}, 
    {id: 2, isDone: false},
    {id: 3, isDone: true}
];

const filtered = data.filter(item => item.isDone === true);
console.log(filtered);

//Задача 2.1
function ElementBiggerThenNum(arr, num) {
    return arr.filter(item => item > num);
}

console.log(ElementBiggerThenNum([1, 4, 6, 3, 2], 2));

//Задача 2.2
function flatten(arr) {
    return arr.flat(Infinity);
}

console.log(flatten([1, 4, [34, 1, 20], [6, [6, 12, 8], 6]]));

//Задача 3.3
function countPairs(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === 0) {
                count++;
            }
        }
    }
    return count;
}

console.log(countPairs([-7, 12, 4, 6, -4, -12, 0])); 
console.log(countPairs([-1, 2, 4, 7, -4, 1, -2]));  
console.log(countPairs([-1, 1, 0, 1]));             
console.log(countPairs([-1, 1, -1, 1]));            
console.log(countPairs([1, 1, 1, 0, -1]));         
console.log(countPairs([0, 0]));                    
console.log(countPairs([]));          

function countTriplets(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                if (arr[i] + arr[j] + arr[k] === 0) {
                    count++;
                }
            }
        }
    }
    return count;
}

console.log("Тройки чисел")

console.log(countTriplets([-7, 12, 4, 6, -4, -12, 0])); 
console.log(countTriplets([-1, 2, 4, 7, -4, 1, -2]));  
console.log(countTriplets([-1, 1, 0, 1]));             
console.log(countTriplets([-1, 1, -1, 1]));            
console.log(countTriplets([1, 1, 1, 0, -1]));         
console.log(countTriplets([0, 0]));                    
console.log(countTriplets([]));  