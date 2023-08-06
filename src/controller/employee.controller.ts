import { plainToInstance } from "class-transformer";
import employeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import express, { NextFunction, Request, Response } from "express";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { Validate, validate } from "class-validator";
import putEmployeeDto from "../dto/put-employee.dto";
import PutEmployeeDto from "../dto/put-employee.dto";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation-exception";
import authenticate from "../middleware/authenticate.middleware";
import Authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import PatchEmployee from "../dto/patch-empolyee.dto";
import PatchEmployeeDto from "../dto/patch-empolyee.dto";
import logger from "../logger/logger";
//all router are middlewares. they can take next function as parameter to callthe next middleware.
class EmployeeController{
    public router: express.Router;
    //private employeeService: EmployeeService;

    constructor(private employeeService:EmployeeService){
        this.router = express.Router();
        //this.employeeService = new EmployeeService();

        this.router.get("/",authenticate,this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeById);
        this.router.put("/:id",this.putEmployeeById);
        this.router.post("/",authenticate,this.postEmployee);
        this.router.delete("/:id",authenticate,Authorize([Role.HR]),this.deleteEmployee);
        this.router.post("/login",this.loginEmployee);
        this.router.patch("/:id",authenticate,Authorize([Role.HR]),this.patchEmployee);

    }

    getAllEmployees = async (req:express.Request,res:express.Response)=>{
        const reqTime = Date.now();
        const employees = await this.employeeService.getAllEmployees();
        //const responseTime = Date.now()-reqTime;
        //const responseString = JSON.stringify(employees);
        const responseLength = employees.length;
        res.status(200).send({employees,errors:"null",message:"OK",meta:{length: `${responseLength}`, took : `${Date.now()-reqTime}`,total: `${responseLength}`}});
    }

    getEmployeeById = async (req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
        
            const employeeId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            logger.info("Get employee by id successful")
            res.status(200).send(employee);
        }
        catch(error){
            //logger.info("Employee with given id not found")
            next(error);
        }
            
    }

    putEmployeeById = async(req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const employeeId = Number(req.params.id);

            const putEmployeeDto = plainToInstance(PutEmployeeDto,req.body);
            const errors = await validate(putEmployeeDto);
            if (errors.length > 0){
                //console.log(errors);
                logger.info(`Errors in validating employee details ${errors}`);
                throw new ValidationException(400,`Validation errors`,errors);

            }
            else
            {

                // const newName = req.body.name;
                // const newEmail = req.body.email;
                // const newAddress = req.body.address;

                // const updatedAt = new Date();
                const empId = Number(req.params.id);
                const employee = await this.employeeService.putEmployeeById(putEmployeeDto,empId);
                //employee.name = req.body.name;
                //employee.email = req.body.email;
                logger.info("put employee by id succesful")
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
                logger.info(`Validation errors in posting employee details`);
                throw new ValidationException(400,`Validation errors`,errors);
            }
            else{
                // const newName = req.body.name;
                // const email = req.body.email;
                // const address = req.body.address;
                // const password = req.body.password;
                // const role = req.body.role;
                const employee = await this.employeeService.postEmployee(createEmployeeDto);
                logger.info("posting employee successful");
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
            logger.info(`Employee deleted with id: ${empId}`)
            res.status(200).send("employee deleted");
        }
        catch(error){
            next(error);
        }
        
    }

    loginEmployee = async(req:Request,res:Response,next:NextFunction)=>{
        const email = req.body.email;
        const password = req.body.password;
        try{
            const {token,employee} = await this.employeeService.loginEmployee(email,password);
            logger.info(`Login successful`);
            res.status(200).send({data:token,employee});
        }
        catch(error)
        {
            next(error);
        }
        //await this.employeeService.loginEmployee()
    }


    patchEmployee = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const patchEmployeeDto = plainToInstance(PatchEmployeeDto,req.body);
            const errors = await validate(patchEmployeeDto);
            if (errors.length > 0){
                console.log(errors);
                logger.info("Validation errors in patch employee")
                throw new ValidationException(400,`Validation errors`,errors);
            }
            else{
                const empId = Number(req.params.id);
                const employee = await this.employeeService.patchEmployee(patchEmployeeDto,empId)
                logger.info(`patch employee with id: ${empId} successful`)
                res.status(200).send(employee);
            }
        }
        catch(error){
            next(error)
        }
    }

    
}

export default EmployeeController;