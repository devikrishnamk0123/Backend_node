import employeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import express from "express";

class EmployeeController{
    public router: express.Router;
    //private employeeService: EmployeeService;

    constructor(private employeeService:EmployeeService){
        this.router = express.Router();
        //this.employeeService = new EmployeeService();

        this.router.get("/",this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeById);
        this.router.put("/:id",this.putEmployeeById);
        this.router.post("/",this.postEmployee);
        this.router.delete("/:id",this.deleteEmployee);

    }

    getAllEmployees = async (req:express.Request,res:express.Response)=>{
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    getEmployeeById = async (req:express.Request,res:express.Response)=>{
        
        const employeeId = Number(req.params.id);
        const employee = await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(employee);
    }

    putEmployeeById = async(req:express.Request,res:express.Response)=>{
        const employeeId = Number(req.params.id);

        
        const newName = req.body.name;
        const newEmail = req.body.email;
        const updatedAt = new Date();
        const employee = await this.employeeService.putEmployeeById(employeeId,newName,newEmail,updatedAt);
        //employee.name = req.body.name;
        //employee.email = req.body.email;

        res.status(200).send(employee);
    }

    postEmployee = async(req:express.Request,res:express.Response)=>{
        const newName = req.body.name;
        const email = req.body.email;

        const employee = await this.employeeService.postEmployee(newName,email);
        res.status(200).send(employee);
    }

    deleteEmployee = async(req:express.Request,res:express.Response)=>{
        const empId = Number(req.params.id);

        const status = await this.employeeService.deleteEmployee(empId);
        res.status(200).send(status);
    }
}

export default EmployeeController;