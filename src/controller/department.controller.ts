import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import authenticate from "../middleware/authenticate.middleware";
import Authorize from "../middleware/authorize.middleware";
import CreateDepartmentDto from "../dto/create-department.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ValidationException from "../exception/validation-exception";
import DepartmentService from "../service/department.service";
import PutDepartmenDto from "../dto/put-department.dto";
import { Role } from "../utils/role.enum";
import logger from "../logger/logger";
import { MetadataWithSuchNameAlreadyExistsError } from "typeorm";
import HttpException from "../exception/http.exception";

class DepartmentController{
    public router: express.Router;

    constructor(private departmentService: DepartmentService){
        this.router = express.Router();

        this.router.get("/",authenticate,this.getAllDepartments);
        this.router.get("/:id",authenticate,this.getDepartmentById);
        this.router.put("/:id",authenticate,this.putDepartmentById);
        this.router.post("/",authenticate,Authorize([Role.HR]),this.postDepartment);
        this.router.delete("/:id",authenticate,Authorize([Role.HR]),this.deleteDepartment);
    }


    postDepartment = async(req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const createDepartmentDto = plainToInstance(CreateDepartmentDto,req.body) //converts json to object of createEmployeeDto
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0){
                console.log(errors);
                logger.info("Validation errors in posting department")
                throw new ValidationException(400,`Validation errors`,errors);
            }
            else{
                // const newName = req.body.name;
                // const email = req.body.email;
                // const address = req.body.address;
                // const password = req.body.password;
                // const role = req.body.role;
                const department = await this.departmentService.postDepartment(createDepartmentDto);
                logger.info("Posting department successful");
                res.status(200).send(department);
            }
        }
        catch(error){
            next(error);
        }
    }

    getAllDepartments = async (req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const employees = await this.departmentService.getAllDepartments();
            logger.info("Get all departments successful")
            res.status(200).send(employees);
        }
        catch(error){
            next(error); 
        }
        
    }

    getDepartmentById = async (req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
        
            const deptId = Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(deptId);
            res.status(200).send(department);
        }
        catch(error){
            next(error);
        }
        
    }

    putDepartmentById = async(req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const departmentId = Number(req.params.id);

            const putDepartmentDto = plainToInstance(PutDepartmenDto,req.body);
            const errors = await validate(putDepartmentDto);
            if (errors.length > 0){
                console.log(errors);
                throw new ValidationException(400,`Validation errors`,errors);

            }
            else
            {

                // const newName = req.body.name;
                // const newEmail = req.body.email;
                // const newAddress = req.body.address;

                // const updatedAt = new Date();
                const deptId = Number(req.params.id);
                const department = await this.departmentService.putDepartmentById(putDepartmentDto,deptId);
                if (!department){
                    throw new HttpException(404,`Department not found with id:${deptId}`)
                }
                //employee.name = req.body.name;
                //employee.email = req.body.email;
                res.status(200).send(department);
            }
        }
        catch(error){
            next(error);
        }
    }

    deleteDepartment = async(req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const deptId = Number(req.params.id);
            //const employee = await this.departmentService.getDepartmentById(deptId);

            const department = await this.departmentService.deleteDepartment(deptId);
            if (!department){
                throw new HttpException(404,`Department with id: ${deptId} not found`)
            }
            res.status(200).send(department);
        }
        catch(error){
            next(error);
        }
        
    }
}

export default DepartmentController;