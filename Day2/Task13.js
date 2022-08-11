function areEqual(obj1,obj2){
    debugger
    if(obj1===obj2) return true;
    if(Object.keys(obj1).lenght!=Object.keys(obj2).lenght) return false;
    for(let key in obj1){
        if(typeof obj1[key]!=="object" && typeof obj1[key]!=="function"){
            if(obj1[key]!=obj2[key]) return false;
        }else{
            return areEqual(obj1[key],obj2[key]);
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
    }
}

let person2=person;

let person3={
    name:"Karlen",
    surname:"Hakobyan",
    age:55,
    married:true,
    family:{
        wife:"Tsaghik",
        son:"Vazgen",
        daughter:"Manushak"
    }
}

let person4={
    name:"Karlen",
    surname:"Hakobyan",
    age:55,
    married:true,
    family:{
        wife:"Tsaghik",
        son:"Andranik",
        daughter:"Manushak"
    }
}


console.log(areEqual(person,person2));
console.log(areEqual(person,person3));
console.log(areEqual(person,person4));