const array=[25,10,88,-4,57,90,-99];

function sum(arr){
    let sum=0;
    for(let el of arr){
        sum+=el;
    }
    return sum;
}
function product(arr){
    let prod=1;
    for(let el of arr){
        prod*=el;
    }
    return prod;
}
console.log(`The sum of the array's elements is ${sum(array)} and the product is ${product(array)}`);