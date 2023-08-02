import express from "express";
import { Employee } from "./employee";

//to group all requests.
let count = 2;

//npm install @types/express
const employeeRouter = express.Router();

employeeRouter.get('/',(req,res)=>{
    console.log(req.url);
    res.status(200).send(employees);
});

employeeRouter.get('/:id',(req,res)=>{

    console.log(req.url);
    req.params.id //to get the value of the param in the url
    res.status(200).send(employees.find(employee=>employee.id === Number(req.params.id)));
});

employeeRouter.post('/',(req,res)=>{
    console.log(req.url);
    const newEmployee = new Employee();
    newEmployee.id = ++count;
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    newEmployee.createdAt = new Date();
    newEmployee.updatedAt = new Date();

    employees.push(newEmployee);
    res.status(201).send(newEmployee);
});


employeeRouter.put('/:id',(req,res)=>{
    console.log(req.url);
    const emp = employees.find(employee=>employee.id === Number(req.params.id));
    emp.email = req.body.email;
    emp.name = req.body.name;
    emp.updatedAt = new Date();
    res.status(201).send("employee updated")
});

employeeRouter.patch('/:id',(req,res)=>{
    console.log(req.url);
    res.status(201).send("employee updated");
});

employeeRouter.delete('/:id',(req,res)=>{
    console.log(req.url);
    //const emp = employees.find(employee=>employee.id === Number(req.params.id));
    const index = employees.findIndex(employee=>employee.id === Number(req.params.id));
    employees.splice(index,1);
    res.status(201).send("employee deleted");
});


export default employeeRouter;


const employees: Employee[] = [{
    id:1,
    name:"Devi",
    email:"devi@gmail.com",
    createdAt:new Date(),
    updatedAt:new Date()
},{
    id:2,
    name:"John",
    email:"john@gmail.com",
    createdAt:new Date(),
    updatedAt:new Date()
}]
