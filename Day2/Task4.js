function splitString(str){
    let word="";
    let words=[];
    for(let i=0;i<str.length;i++){
        if(str[i]==" "){
            words.push(word);
            word="";
        }else{
            word+=str[i];
        }
    }
    words.push(word);
    return words;
}

const string="Hello World, this is a sentence.";

console.log(splitString(string));