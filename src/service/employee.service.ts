import { UpdateResult } from "typeorm";
import { Employee } from "../entity/employee.entity";
import employeeRepository from "../repository/employee.repository";

class EmployeeService{
    //private employeeRepository: employeeRepository;

    constructor(private employeeRepository:employeeRepository)
    {
        //this.employeeRepository = new EmployeeRepository();
    }

    getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.find();
    }

    getEmployeeById(id:number):Promise<Employee|null>
    {
        return this.employeeRepository.findOneBy(id);
    }


    async putEmployeeById(id:number,name:string,email:string,updatedAt:Date):Promise<Employee>
    {
        const employee = await this.employeeRepository.findOneBy(id);
        employee.name = name;
        employee.email = email;
        employee.updatedAt = updatedAt;

        return this.employeeRepository.saveId(employee);
        
    }

    async postEmployee(name:string,email:string){
        const employee = new Employee();
        employee.email = email;
        employee.name = name;
        
        return this.employeeRepository.saveId(employee)
    }

    async deleteEmployee(id:number):Promise<Boolean>{
        const result = await this.employeeRepository.softDelete(id);
        if (result.affected == 1)
            return true;
        else
            return false;
    }

}

export default EmployeeService;