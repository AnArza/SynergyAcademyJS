function cloneArray(arr){
    let newArr=[];
    for(let el of arr){
        newArr.push(el);
    }
    return newArr;
}
let array=[74,"text",12,true,"other text",90];
let clonedArr=cloneArray(array);
console.log(clonedArr);