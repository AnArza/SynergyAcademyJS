function deepClone(obj) {
    let deepClonedObj={};
    for(let key in obj){
        if(typeof obj[key]!=="object" && typeof obj[key]!=="function"){
            deepClonedObj[key]=obj[key];
        }else{
            deepClonedObj[key]=deepClone(obj[key]);
        }
    }
    return deepClonedObj;
}

let person={
    name:"Karlen",
    surname:"Hakobyan",
    age:55,
    married:true,
    family:{
        wife:"Tsaghik",
        son:"Andranik",
        daughter:"Manushak"
    },
    cars:["Mercedes","Audi","BMW"]
}

let cloned=deepClone(person);
cloned.family.wife="Armenush";
cloned.cars[2]="Ferrari";
console.log(cloned);
console.log(person);
