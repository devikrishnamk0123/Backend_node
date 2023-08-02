import express from "express";
import { Employee } from "./employee";
import { Client } from 'pg';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";
import AppDataSource from "./data-source";
//to group all requests.
let count = 2;

//npm install @types/express
const employeeRouter = express.Router();

employeeRouter.get('/',async (req,res)=>{
    console.log(req.url);
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employees = await employeeRepository.find();
    res.status(200).send(employees);
});

employeeRouter.get('/:id',async(req,res)=>{
    

    // const client = new Client(
    // {
    //     host: 'localhost',
    //     port: 8765,
    //     database: 'training',
    //     user: 'postgres',
    //     password: 'postgres'
    // }
    // )

    // const AppDataSource = new DataSource({
    //     type: "postgres",
    //     host: "localhost",
    //     port: 8765,
    //     username: "postgres",
    //     password: "postgres",
    //     database: "training",
    //     entities: [Employee],
    //     synchronize: false,
    //     logging: true,
    //     namingStrategy: new SnakeNamingStrategy()
    // })
    //await AppDataSource.initialize(); // conects to the database.

    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({id: Number(req.params.id)})

    //await client.connect();
    //const result = await client.query("select * from employees where id = $1",[req.params.id]);



    // const rawemployee = result.rows[0];

    // const employee = new Employee();
    // employee.id = rawemployee.id;
    // employee.name = rawemployee.name;
    // employee.email = rawemployee.email;
    // employee.createdAt = rawemployee.createdAt;
    // employee.updatedAt = rawemployee.updatedAt;
    res.status(200).send(employee);



    console.log(req.url);
    // req.params.id //to get the value of the param in the url
    // res.status(200).send(employees.find(employee=>employee.id === Number(req.params.id)));
});

employeeRouter.post('/',async(req,res)=>{
    console.log(req.url);
    const newEmployee = new Employee();
    //newEmployee.id = ++count;
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    //newEmployee.createdAt = new Date();
    //newEmployee.updatedAt = new Date();
    const employeeRepository = AppDataSource.getRepository(Employee);
    const savedEmployee = await employeeRepository.save(newEmployee);

    //employees.push(newEmployee);
    res.status(201).send(savedEmployee);
});


employeeRouter.put('/:id',async(req,res)=>{
    console.log(req.url);
    //const emp = employees.find(employee=>employee.id === Number(req.params.id));
    const employeeRepository = AppDataSource.getRepository(Employee);
    const emp = await employeeRepository.findOneBy({id:Number(req.params.id)});

    emp.email = req.body.email;
    emp.name = req.body.name;
    await employeeRepository.save(emp);
    //emp.updatedAt = new Date();
    res.status(201).send("employee updated")
});

employeeRouter.patch('/:id',(req,res)=>{
    console.log(req.url);
    res.status(201).send("employee updated");
});

employeeRouter.delete('/:id',async (req,res)=>{
    console.log(req.url);

    const employeeRepository = AppDataSource.getRepository(Employee);
    const emp = await employeeRepository.findOneBy({id: Number(req.params.id)});
    //const emp = employees.find(employee=>employee.id === Number(req.params.id));
    employeeRepository.delete(emp.id);
    //const emp = employees.find(employee=>employee.id === Number(req.params.id));
    //const index = employees.findIndex(employee=>employee.id === Number(req.params.id));
    //employees.splice(index,1);
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
