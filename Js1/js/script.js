//Задание 1
let admin;
let name;
name = "Джон";
admin = name;
alert(admin)

//Задание 2
// let a = prompt("Первое число?", 1);
// let b = prompt("Второе число?", 2);

// alert(Number(a) + Number(b));

//Задание 3
for(let i = 1; i < 10; i++){
    if(i%2 == 0)
    console.log(i)
}

// Задание 4
// let i = 0;
// while (i < 3) {
// alert( `number ${i}!` );
// i++;
// }

//Задание 5
let isTrue = true;
while(isTrue){
    let a = prompt("Введите число больше 100");
    if(a == null){
        break;
    }
    a = Number(a)
    if(typeof a == "number"){
        if(a >=100){
            alert("Ввод успешен");
            isTrue = false
        }
        else{
            alert("Число меньше 100");
        }
    }
}

//Задание 6
function isPrime(num){
    if(num < 2){
        return false;
    }
    for(let i = 2; i < num; i++){
        if(num%i==0){
            return false;
        }
    }
    return true;
}

console.log("Задание 6")


let num = 100;
for(let i = 0; i < num; i++){
    if(isPrime(i)){
        console.log(i);
    }
}