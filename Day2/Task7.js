function checkIfWeekend(date){
    if(date.getDay()==6 || date.getDay()==0) return true;
    return false;
}

const now=new Date();

const date1 = new Date();
date1.setFullYear(2022);
date1.setMonth(7);
date1.setDate(6);

const date2 = new Date();
date2.setFullYear(2021);
date2.setMonth(1);
date2.setDate(28);

console.log(checkIfWeekend(date1));
console.log(checkIfWeekend(now));
console.log(checkIfWeekend(date2));