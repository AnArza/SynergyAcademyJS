//first solution
function mergedUniqueArr(arr1,arr2){
    const arr=arr1.concat(arr2);
    let res=[...new Set(arr)];
    return res;
}

//second solution
function mergedUniqueArr2(arr1,arr2){
    const arr=arr1.concat(arr2);
    let res=arr.filter((el,index)=>arr.indexOf(el)==index);
    return res;
}

const arr1=[6,1,8,2,5,1,1,3];
const arr2=[7,9,2,1,6,4];

console.log(mergedUniqueArr(arr1,arr2));  //first
console.log(mergedUniqueArr2(arr1,arr2)); //second