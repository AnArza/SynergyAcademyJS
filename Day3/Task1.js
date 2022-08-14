//Merge Sort

function merge(left,right){
    let merged=[];
    while(left.length!=0 && right.length!=0){
        if(left[0]<right[0]){
            merged.push(left.shift());
        }else{
            merged.push(right.shift());
        }
    }
    
    if(left.length==0 && right.length!=0){
        merged.push(...right);
    } else {
        merged.push(...left);
    }
    return merged;
}

function mergeSort(arr){
    let mid=Math.ceil(arr.length/2);
    let left=[];
    let right=[];
    if(arr.length<2) return arr;
    for(let i=0;i<mid;i++){
        left.push(arr[i]);
    }
    for(let j=mid;j<arr.length;j++){
        right.push(arr[j]);
    }
    return merge(mergeSort(left),mergeSort(right));
}

const array=[6,2,3,9,0,3,-8,22,7,110,4,-78];

console.log(mergeSort(array));
