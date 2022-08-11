function areEqual(obj1,obj2){
    if(obj1===obj2) return true;
    if(Object.keys(obj1).lenght!=Object.keys(obj2).lenght) return false;
    for(let key in obj1){
        if(typeof obj1[key]!=="object" && typeof obj1[key]!=="function"){
            if(obj1[key]!=obj2[key]) return false;
        }else{
            if(!areEqual(obj1[key],obj2[key])) return false;
        }
    }
    return true;
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

let person2=person;

let person3={
    name:"Karlen",
    surname:"Hakobyan",
    age:55,
    married:true,
    family:{
        wife:"Tsaghik",
        son:"Andranik",
        daughter:"Manushak"
    },
    cars:["Mercedes","Infiniti","BMW"]
}

let person4={
    name:"Karlen",
    surname:"Hakobyan",
    age:55,
    married:true,
    family:{
        wife:"Dezdemona",
        son:"Andranik",
        daughter:"Manushak"
    },
    cars:["Mercedes","Audi","BMW"]
}

let person5={
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

console.log(areEqual(person,person2));
console.log(areEqual(person,person3));
console.log(areEqual(person,person4));
console.log(areEqual(person,person5));
