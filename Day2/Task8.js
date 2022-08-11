function camelize(str){
    let words=str.split("-");
    let res="";
    res+=words[0];
    for(let i=1;i<words.length;i++){
        res+=words[i].substring(0,1).toUpperCase()+words[i].substring(1,words[i].length);
    }
    return res;
}
const string="my-short-string";
const otherString="this-is-my-long-string";
console.log(camelize(string));
console.log(camelize(otherString));