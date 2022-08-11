function checkIfArr(arr){
    if(arr instanceof Array){
        return true;
    }
    return false;
}

const num=142;
const array=[74,"text",12,true,"other text",90];
const empty=[];
const obj={
    name:"Ani",
    surname:"Arzumanyan",
    age:19,
    phone:"+374983848mr8"
}
const str="hello guys";

console.log(checkIfArr(num));
console.log(checkIfArr(array));
console.log(checkIfArr(empty));
console.log(checkIfArr(obj));
console.log(checkIfArr(str));


