function Queue(){
    this.arr=[]
}
Queue.prototype.enqueue=function(e){
    this.arr.push(e);
}
Queue.prototype.dequeue=function(){
    if(this.isEmpty()) return null;
    return this.arr.shift();
}
Queue.prototype.first=function(){
    if(this.isEmpty()) return null;
    return this.arr[0];
}
Queue.prototype.size=function (){
    return this.arr.length;
}
Queue.prototype.isEmpty=function(){
    if(this.size()==0) return true;
    return false;
}
Queue.prototype[Symbol.toPrimitive]=function(hint){
    return hint==="number" ? this.size() : `${[...this.arr]}`;
}


// Testing

const queue=new Queue();

console.log(queue.isEmpty())
queue.enqueue(5)
queue.enqueue(7)
queue.enqueue(11)
queue.enqueue(4)
console.log(queue.dequeue())
console.log(queue.size())
console.log(queue.first())

console.log(+queue)