function myReduce(arr,callback,initialValue){
    if(arr.length==0) return initialValue;
    let accumlator=initialValue;
    for(let i=0;i<arr.length;i++){
        accumlator=callback(accumlator,arr[i]);
    }
    return accumlator;
}

let array=[15,8,2,36,5,9,2];

console.log(array.reduce((acc,curr)=>{return acc+curr},0)); //original reduce method

console.log(myReduce(array,(acc,curr)=>{return acc+curr},0)); //my reduce function