import { UpdateResult } from "typeorm";
import { Employee } from "../entity/employee.entity";
import employeeRepository from "../repository/employee.repository";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";
import bcrypt from "bcrypt";
import jsonWebTOken from "jsonwebtoken";
import { Role } from "../utils/role.enum";
import { jwtPayload } from "../utils/jwtPayload.type";
import CreateEmployeeDto from "../dto/create-employee.dto";
import PutEmployeeDto from "../dto/put-employee.dto";
import DepartmentRepository from "../repository/department.repository";
import AppDataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import PatchEmployeeDto from "../dto/patch-empolyee.dto";
import logger from "../logger/logger";


class EmployeeService{
    //private employeeRepository: employeeRepository;
    //private departmentRepository: DepartmentRepository;

    constructor(private employeeRepository:employeeRepository)
    {
        //this.employeeRepository = new EmployeeRepository();
    }

    getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.find();
    }

    async getEmployeeById(id:number):Promise<Employee|null>
    {
        const employee = await this.employeeRepository.findOneBy(id);
        if (!employee){
            logger.info(`GetEmployeeById-Service_layer-Employee not found with id: ${id}`)
            throw new HttpException(404,`Employee not found with id: ${id}`);
            //throw new Error(`Employee not found with id: ${id}`); 
        }
        //employee.name = "xyz";
        //return this.employeeRepository.findOneBy(id);
        return employee;
    }


    async putEmployeeById(empObj:PutEmployeeDto,id:number):Promise<Employee>
    {

        //console.log(id);
        const employee = await this.employeeRepository.findOneBy(id);
        if (!employee){
            logger.info(`putEmployeeById-Service-layer-Employee not found with id: ${id}`);
            throw new HttpException(404,`Employee not found with id: ${id}`)
        }
        //const address = new Address();
        employee.address.address_line_1 = empObj.address.address_line_1;
        employee.address.pincode = empObj.address.pincode;
        employee.address.address_line_2 = empObj.address.address_line_2;
        employee.address.city = empObj.address.city;
        employee.address.country = empObj.address.city;
        employee.address.state = empObj.address.state;
        employee.email = empObj.email;

        employee.experience = empObj.experience;
        employee.joining_Date = empObj.joining_date;
        //employee.department = empObj.department;
        //employee.age = empObj.age;
        employee.name = empObj.name;
        employee.password = await bcrypt.hash(empObj.password,10);
        employee.role = empObj.role;
        const departmentRepository = new DepartmentRepository(AppDataSource.getRepository(Department));
        const departmentObj = await departmentRepository.findOneBy(empObj.departmentId);
        employee.department = departmentObj;
        //const dpartment = await this.
        //employee.de = empObj.departmentId;

        employee.updatedAt = new Date();

        return this.employeeRepository.saveId(employee);
        
    }


    async postEmployee(empObj:CreateEmployeeDto){
        const employee = new Employee();
        employee.email = empObj.email;
        employee.name = empObj.name;
        employee.password = await bcrypt.hash(empObj.password,10);
        employee.role = empObj.role;
        employee.experience = empObj.experience;
        employee.joining_Date = empObj.joining_date;
        const newAddress = new Address();
        newAddress.address_line_1 = empObj.address.address_line_1;
        newAddress.pincode = empObj.address.pincode;
        newAddress.address_line_2 = empObj.address.address_line_2;
        newAddress.city = empObj.address.city;
        newAddress.country = empObj.address.country;
        newAddress.state = empObj.address.state;
        employee.address = newAddress;

        const departmentRepository = new DepartmentRepository(AppDataSource.getRepository(Department));
        const departmentObj = await departmentRepository.findOneBy(empObj.departmentId);
        if (!departmentObj){
            throw new HttpException(404,"No department found with the given id")
        }
        else{

            employee.department = departmentObj;
        }
        return this.employeeRepository.saveId(employee)
    }

    async deleteEmployee(id:number){
        const employee = await this.employeeRepository.findOneBy(id);
        const result = await this.employeeRepository.softRemove(employee);
    }

    loginEmployee = async(email:string,password:string)=>{
        const employee = await this.employeeRepository.findOneByemail(email);
        if (!employee){
            throw new HttpException(404,"Incorrect username or Password");
        }
        else{
            const correctPassword = await bcrypt.compare(password,employee.password); // compare operation is expensive.
            if (!correctPassword){
                throw new HttpException(401,"Incorrect username or Password");
            }
            //generate JWT token.
            const payload:jwtPayload = {name:employee.name,email:employee.email,role: employee.role};
            const token = jsonWebTOken.sign(payload,"ABCDE",{expiresIn:"10h"});

            return{token:token,employee:employee};
        }
    }

    async patchEmployee(empObj:PatchEmployeeDto,empId:number):Promise<Employee>{
    
        const employee = await this.employeeRepository.findOneBy(empId);
        if (!employee){
            throw new HttpException(404,"No employee found");
        }
        else{
            if (empObj.name){
                employee.name = empObj.name;
            }

            if (empObj.email){
                employee.email = empObj.email;
            }

            if (empObj.address){
                if (empObj.address.city){
                    employee.address.city = empObj.address.city;
                }

                if (empObj.address.address_line_1){
                    employee.address.address_line_1 = empObj.address.address_line_1;
                }

                if (empObj.address.address_line_2){
                    empObj.address.address_line_2 = empObj.address.address_line_2;
                }
            }

            if (empObj.departmentId){
                const departmentRepository = new DepartmentRepository(AppDataSource.getRepository(Department));
                const departmentObj = await departmentRepository.findOneBy(empObj.departmentId);
                if (!departmentObj){
                    throw new HttpException(404,"No department found with the given id")
                }
                else{

                    employee.department = departmentObj;
                }
            }

            if (empObj.experience){
                employee.experience = empObj.experience;
            }

            if (empObj.joining_date){
                employee.joining_Date = empObj.joining_date;
            }

            if (empObj.password){
                employee.password = await bcrypt.hash(empObj.password,10);
            }

            if (empObj.role){
                employee.role = empObj.role;
            }
        }
        return this.employeeRepository.saveId(employee);
    }

}

export default EmployeeService;