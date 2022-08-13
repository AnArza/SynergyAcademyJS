//Employee

function Employee(lastName,salary,birthday,employmentYear){
    this.lastName=lastName;
    this.salary=salary;
    this.birthday=birthday;
    this.employmentYear=employmentYear;
    this.getAge=function(){
        let age;
        const birthYear=this.birthday.getFullYear();
        const birthMonth=this.birthday.getMonth();
        const yearNow=new Date().getFullYear();
        const monthNow=new Date().getMonth();
        if(birthMonth<monthNow){
            age=yearNow-birthYear;
        }else if(birthMonth>monthNow){
            age=yearNow-birthYear-1;
        }else if(birthMonth==monthNow && this.birthday.getDate()>new Date.getDate()){
            age=yearNow-birthYear-1;
        }else {
            age=yearNow-birthYear;
        }
        return age;
    }
    this.getExperience=function(){
        let experience;
        const yearNow=new Date().getFullYear();
        const birthYear=this.birthday.getFullYear();
        if(this.getAge()>=65){
            experience=birthYear+65-this.employmentYear;
        }else {
            experience=yearNow-this.employmentYear;
        }
        return experience;
    }
    this.getExperienceInDays=function(){
        let experienceInDays;
        const birthYear=this.birthday.getFullYear();
        const birthMonth=this.birthday.getMonth();
        const birthDay=this.birthday.getDate();
        if(this.getAge()>=65){
            experienceInDays=Math.ceil((new Date(birthYear+65,birthMonth,birthDay)-new Date(this.employmentYear,0))/(1000*60*60*24));
        }else {
            experienceInDays=Math.ceil((new Date()-new Date(this.employmentYear,0))/(1000*60*60*24));
        }
        return experienceInDays;
    }
    this.getDaysUntilRetirement=function(){
        let days;
        const birthYear=this.birthday.getFullYear();
        const birthMonth=this.birthday.getMonth();
        const birthDay=this.birthday.getDate();
        if(this.getAge()<65){
            days=Math.ceil((new Date(birthYear+65,birthMonth,birthDay)-new Date())/(1000*60*60*24));
        }else {
            return "Already retired.";
        }
        return days;
    }
}

//Testing Employee

const ani=new Employee("Arzumanyan",250000,new Date("02/10/2003"),2020);
console.log(`Age: ${ani.getAge()}`);
console.log(`Experience: ${ani.getExperience()}`);
console.log(`Experience in days: ${ani.getExperienceInDays()}`);
console.log(`Days until retirement: ${ani.getDaysUntilRetirement()}`);

ani[Symbol.toPrimitive]=function(hint){
    console.log(`hint: ${hint}`);
    return hint == "string" ? `lastName: ${this.lastName}` : this.salary;
}
// alert(ani)
console.log(+ani)

//Production

const Production={
    name:"Apple",
    salarySum:0,
    monthlyProfit:2000000,
    monthlySpendings:0,
    employees:[],
    addEmployee:function(employee){
        if(employee instanceof Employee){
            this.employees.push(employee);
            this.salarySum+=employee.salary;
            this.monthlySpendings+=employee.salary;
            this.monthlyProfit-=employee.salary;    
        }else console.log("You can add only employees.");
    },
    deleteEmployee:function(employee){
        if(employee instanceof Employee){
            this.employees=this.employees.filter((emp)=>emp!==employee);
            this.salarySum-=employee.salary;
            this.monthlySpendings-=employee.salary;
            this.monthlyProfit+=employee.salary;
        }else console.log("You can delete only employees.");
    },
    getAvgSalary:function(){
        let sum=0;
        for(const emp of this.employees){
            sum+=emp.salary;
        }
        return sum/this.employees.length;
    },
    [Symbol.toPrimitive]:function(hint){
        console.log(`hint: ${hint}`);
        return hint == "string" ? `name: ${this.name}` : this.salarySum;
    }
}

//Testing Production

const emp1=new Employee("Arzumanyan",250000,new Date("02/10/2003"),2020)
const emp2=new Employee("Melik-Parsadanyan",170000,new Date("03/07/2001"),2021)
const emp3=new Employee("Tshaghkabuylyan",365000,new Date("11/12/1997"),2018)

console.log(Production.employees)
console.log(`Salary Sum: ${Production.salarySum}`)
console.log(`Monthly Profit: ${Production.monthlyProfit}`)
console.log(`Monthly Spendings: ${Production.monthlySpendings}`)
Production.addEmployee(emp1)
Production.addEmployee(emp2)
Production.addEmployee(emp3)
Production.addEmployee("Hrach")
console.log(Production.employees)
console.log(`Salary Sum: ${Production.salarySum}`)
console.log(`Monthly Profit: ${Production.monthlyProfit}`)
console.log(`Monthly Spendings: ${Production.monthlySpendings}`)
Production.deleteEmployee("hrach")
Production.deleteEmployee(emp3)
console.log(Production.employees)
console.log(`Salary Sum: ${Production.salarySum}`)
console.log(`Monthly Profit: ${Production.monthlyProfit}`)
console.log(`Monthly Spendings: ${Production.monthlySpendings}`)

console.log(+Production)

//Console application

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'q') {
        process.exit();
    }
})

console.log("Press Q if you want to quit the program.");