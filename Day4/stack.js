function Stack() {
    this.arr=[];
}

Stack.prototype.push=function(e){
    this.arr.push(e);
}
Stack.prototype.pop=function(){
    if(this.isEmpty()) return null;
    return this.arr.pop();
}
Stack.prototype.top=function (){
    if(this.isEmpty()) return null;
    return this.arr[this.arr.length-1];
}
Stack.prototype.size=function (){
    return this.arr.length;
}
Stack.prototype.isEmpty=function (){
    if(this.size()==0) return true;
    return false;
}
Stack.prototype[Symbol.toPrimitive]=function(hint){
    return hint==="number" ? this.size() : `${[...this.arr]}`;
}


// Testing

const myStack=new Stack();

console.log(myStack.size())
myStack.push(5)
myStack.push(7)
myStack.push(11)
myStack.push(12)
console.log(myStack.size())
console.log(myStack.pop())
console.log(myStack.isEmpty())
console.log(myStack.top())

console.log(+myStack)
// alert(myStack)
