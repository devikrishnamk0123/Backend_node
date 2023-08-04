import { plainToInstance } from "class-transformer";
import employeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { Validate, validate } from "class-validator";
import putEmployeeDto from "../dto/put-employee.dto";
import PutEmployeeDto from "../dto/put-employee.dto";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation-exception";
//all router are middlewares. they can take next function as parameter to callthe next middleware.
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

    getEmployeeById = async (req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
        
            const employeeId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            res.status(200).send(employee);
        }
        catch(error){
            next(error);
        }
        
    }

    putEmployeeById = async(req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const employeeId = Number(req.params.id);

            const putEmployeeDto = plainToInstance(PutEmployeeDto,req.body);
            const errors = await validate(putEmployeeDto);
            if (errors.length > 0){
                console.log(errors);
                throw new ValidationException(404,`not valid request`,errors);

            }
            else
            {

                const newName = req.body.name;
                const newEmail = req.body.email;
                const newAddress = req.body.address;

                const updatedAt = new Date();
                const employee = await this.employeeService.putEmployeeById(employeeId,newName,newEmail,updatedAt);
                //employee.name = req.body.name;
                //employee.email = req.body.email;
                res.status(200).send(employee);
            }
        }
        catch(error){
            next(error);
        }
    }

    postEmployee = async(req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const createEmployeeDto = plainToInstance(CreateEmployeeDto,req.body) //converts json to object of createEmployeeDto
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0){
                console.log(errors);
                throw new ValidationException(404,`Not valid request`,errors);
            }
            else{
                const newName = req.body.name;
                const email = req.body.email;
                const address = req.body.address;
                const employee = await this.employeeService.postEmployee(newName,email,address);
                res.status(200).send(employee);
            }
        }
        catch(error){
            next(error);
        }
    }

    deleteEmployee = async(req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const empId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(empId);

            await this.employeeService.deleteEmployee(empId);
            res.status(200).send("employee deleted");
        }
        catch(error){
            next(error);
        }
        
    }
}

export default EmployeeController;