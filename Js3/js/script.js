//Задача 1.1
function MaxRange(arr){
    arr.sort((a, b) => a - b);
    let result = arr.pop()-arr.shift();
    return result
}

const list = [1, 4, 34, 1, 20, 6, 6, 12, 8, 6];
console.log(MaxRange(list))

//Задача 1.2
