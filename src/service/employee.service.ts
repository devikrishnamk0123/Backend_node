import { UpdateResult } from "typeorm";
import { Employee } from "../entity/employee.entity";
import employeeRepository from "../repository/employee.repository";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";

class EmployeeService{
    //private employeeRepository: employeeRepository;

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
            throw new HttpException(404,`Employee not found with id: ${id}`);
            //throw new Error(`Employee not found with id: ${id}`); 
        }
        //return this.employeeRepository.findOneBy(id);
        return employee;
    }


    async putEmployeeById(id:number,name:string,email:string,updatedAt:Date):Promise<Employee>
    {
        const employee = await this.employeeRepository.findOneBy(id);
        employee.name = name;
        employee.email = email;
        employee.updatedAt = updatedAt;

        return this.employeeRepository.saveId(employee);
        
    }

    async postEmployee(name:string,email:string,address:Address){
        const employee = new Employee();
        employee.email = email;
        employee.name = name;

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        employee.address = newAddress;
        return this.employeeRepository.saveId(employee)
    }

    async deleteEmployee(id:number){
        const employee = await this.employeeRepository.findOneBy(id);
        const result = await this.employeeRepository.softRemove(employee);
    }

}

export default EmployeeService;