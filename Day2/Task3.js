function getFirstNElements(n,arr){
    if(n>arr.length) return `Your array's length is less than ${n}`;
    let res=[];
    for(let i=0;i<n;i++){
        res[i]=arr[i];
    }
    return res;
}

const array=[25,10,88,-4,57,90,-7,-300,71];

console.log(getFirstNElements(4,array));
console.log(getFirstNElements(11,array));