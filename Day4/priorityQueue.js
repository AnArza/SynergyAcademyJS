function PriorityQueue(){
    this.queue=new Map();
}
PriorityQueue.prototype.insert=function(k,v){
    this.queue.set(k,v)
}
PriorityQueue.prototype.min=function(){
    if(this.size()===0) return null;
    let minKey=[...this.queue.keys()][0];
    for(const key of [...this.queue.keys()]){
        if(key<minKey) minKey=key;
    }
    return [minKey,this.queue.get(minKey)];
}
PriorityQueue.prototype.removeMin=function(){
    if(this.size()===0) return null;
    let minKey=[...this.queue.keys()][0];
    for(const key of [...this.queue.keys()]){
        if(key<minKey) minKey=key;
    }
    let temp=this.queue.get(minKey);
    this.queue.delete(minKey);
    return [minKey,temp];
}
PriorityQueue.prototype.size=function(){
    let size=0;
    for(const key of this.queue.keys()){
        size++;
    }
    return size;
}
PriorityQueue.prototype[Symbol.toPrimitive]=function(hint){
    return hint==="number" ? this.size() : `${[...this.queue].sort((a,b)=>a[0]-b[0])}`;
}

// Testing

const priorityQueue=new PriorityQueue();


console.log(priorityQueue.min())
priorityQueue.insert(10,"hehe");
priorityQueue.insert(2,"hshshs");
priorityQueue.insert(7,"value");
priorityQueue.insert(1,"hello");
priorityQueue.insert("t","text");
priorityQueue.insert(-6,"string");
priorityQueue.insert(90,"string");
console.log(priorityQueue.removeMin())
console.log(priorityQueue.removeMin())
console.log(priorityQueue.min())
console.log(priorityQueue.size())

console.log(+priorityQueue)
// alert(priorityQueue)