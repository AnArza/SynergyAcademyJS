function getSums(arr){
    let res=[];
    let sum=0;
    for(let i=0;i<arr.length;i++){
        sum+=arr[i];
        res[i]=sum;
    }
    return res;
}

const array=[4,7,-2,13,1,3,-4,5];
console.log(getSums(array));