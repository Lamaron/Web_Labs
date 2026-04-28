//Задача 1
function reverb(num){
    return parseInt(num.toString().split('').reverse().join(''));
}
console.log(reverb(123))

//Задача 2
function norepet(num) {
    const digits = num.toString().split('');
    const uniq = [];
    
    for (let digit of digits) {
        if (!uniq.includes(digit)) {
            uniq.push(digit);
        }
    }
    
    return parseInt(uniq.join(''));
}
console.log(norepet(111333456));

//Задача 3
function NumCount(num, digit){
    const numStr = num.toString();
    const digitStr = digit.toString();
    let count = 0;

    for(let char of numStr){
        if (char === digitStr){
            count++;
        }
    }
    return count;
}

console.log(NumCount(13453441331, 1))

//Задача 4
function longestSequence(num) {
    const binary = num.toString(2);
    let maxZeros = 0;
    let maxOnes = 0;
    let currentZeros = 0;
    let currentOnes = 0;
    
    for (let bit of binary) {
        if (bit === '0') {
            currentZeros++;
            currentOnes = 0;
            maxZeros = Math.max(maxZeros, currentZeros);
        } else {
            currentOnes++;
            currentZeros = 0;
            maxOnes = Math.max(maxOnes, currentOnes);
        }
    }
    
    return {
        binary: binary,
        longestZeros: maxZeros,
        longestOnes: maxOnes,
        max: Math.max(maxZeros, maxOnes)
    };
}

const result = longestSequence(123); 
console.log(`Двоичная запись: ${result.binary}`);
console.log(`нули: ${result.longestZeros}`);
console.log(`единицы: ${result.longestOnes}`);
console.log(`Макс длина: ${result.max}`);

//Задача 5 
function FirstUniqChar(str) {
    const charCount = {};
    
    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (let char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null; 
}
console.log(FirstUniqChar('asdflkkjwwer[pjdfdneefl;kksadfnsdzjnn')); 

//Задача 6
function generateString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    
    return result;
}
console.log(generateString(5)); 

//Задача 7
function getUniqueChars(str) {
    const seen = new Set();
    let result = '';
    
    for (let char of str) {
        if (!seen.has(char)) {
            seen.add(char);
            result += char;
        }
    }
    
    return result;
}
console.log(getUniqueChars('позволяеткопироватьтекстиз'));