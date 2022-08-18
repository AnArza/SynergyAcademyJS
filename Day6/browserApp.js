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
    this.getExperienceInMonths=function(){
        let experienceInMonths;
        const birthYear=this.birthday.getFullYear();
        const birthMonth=this.birthday.getMonth();
        if(this.getAge()>=65){
            experienceInMonths=(new Date(birthYear+65,birthMonth).getMonth()-new Date(this.employmentYear,0).getMonth())+
                12*(new Date(birthYear+65,birthMonth).getFullYear()-new Date(this.employmentYear,0).getFullYear());
        }else {
            experienceInMonths=(new Date().getMonth()-new Date(this.employmentYear,0).getMonth())+
                12*(new Date().getFullYear()-new Date(this.employmentYear,0).getFullYear());
        }
        return experienceInMonths;
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
    this[Symbol.toPrimitive]=function(hint){
        return hint == "string" ? `lastName: ${this.lastName}` : this.salary;
    }
}


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
            this.salarySum+=employee.salary*employee.getExperienceInMonths();
            this.monthlySpendings+=employee.salary;
            this.monthlyProfit-=employee.salary;
        }else console.log("You can add only employees.");
    },
    deleteEmployee:function(employee){
        if(employee instanceof Employee){
            this.employees=this.employees.filter((emp)=>emp!==employee);
            this.salarySum-=employee.salary*employee.getExperienceInMonths();
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
        return hint == "string" ? `name: ${this.name}` : this.salarySum;
    }
}


//Testing Production

const emp1=new Employee("Arzumanyan",250000,new Date("02/10/2003"),2020)
const emp2=new Employee("Melik-Parsadanyan",170000,new Date("03/07/2001"),2021)
const emp3=new Employee("Tshaghkabuylyan",365000,new Date("11/12/1997"),2018)
Production.addEmployee(emp1)
Production.addEmployee(emp2)
Production.addEmployee(emp3)

alert("Welcome to this web app. You will be given a chance to choose actions to be completed.");
const ACTIONS=[
    "Press 1 to add an employee.",
    "Press 2 to get the table of employees.",
    "Press 3 to get the average salary of employees."
]

for(const action of ACTIONS){
    let act=document.createElement("div");
    act.append(action);
    document.body.appendChild(act);
}

function getAnswer(){
    let numAnswer=prompt("Enter a number");
    if(numAnswer){
        handleAnswer(numAnswer)
    }
}

const table=document.querySelector(".table");

function addHeader(emp){
    let header=document.createElement("thead")
    for(const prop in emp){
        header.append(createHeaderCell(prop))
    }
    table.append(header);
}
function createHeaderCell(prop){
    let head=document.createElement("th");
    head.append(prop);
    return head
}

function addRow(emp){
    let row=document.createElement("tr")
    for(const prop in emp){
        if(typeof emp[prop]=="function"){
            row.append(createCell(emp[prop]()))
        }
        else{
            row.append(createCell(emp[prop]))
        }
    }
    table.append(row);
}
function createCell(val){
    let cell=document.createElement("td");
    cell.append(val);
    return cell;
}
function createEmployeesTable(){
    addHeader(Production.employees[0]);
    for(const emp of Production.employees){
        addRow(emp)
    }
}


function handleAnswer(num){
    switch(num){
        case "1":
            let lastName=prompt("Enter employee last name:");
            let salary=Number(prompt("Enter employee salary:"));
            let bday=prompt("Enter employee birthday:");
            let year=Number(prompt("Enter employment year:"));
            Production.addEmployee(new Employee(lastName,Number(salary),new Date(bday),year))
            alert("New employee added!")
            break;
        case "2":
            table.innerHTML=" "
            createEmployeesTable();
            break;
        case "3":
            let myDiv=document.createElement("div")
            myDiv.append(`The average salary is: ${Production.getAvgSalary()}`)
            document.body.appendChild(myDiv);
            break;
    }
}
