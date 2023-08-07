import { DataSource, Repository, UpdateResult } from "typeorm"
import { Employee } from "../entity/employee.entity";
import AppDataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";



class EmployeeRepository{
    private datasource: DataSource;

    constructor(private employeeRepository: Repository<Employee>){}
        //this.datasource = AppDataSource;     
    //}

    async find(): Promise<Employee[]>{
        //const employeeRepository = this.datasource.getRepository(Employee);
        const employees = this.employeeRepository.find({relations:['department','address']});
        //const employeesWithDepartment = this.employeeRepository.find({relations:{department:true}});
        const employeesWithDepartmentId = (await employees).map(employee=>({...employee,department_id:employee.department?employee.department.id:null,department:undefined}));
        return employeesWithDepartmentId;

    }


    async findOneBy(id:number):Promise<Employee>{
        //const employeeRepository = this.datasource.getRepository(Employee);
        const employee = await this.employeeRepository.findOne({
            where: {id:id},
            relations:{
                address:true,
                department:true
            },
        });
        if (employee)
        {
            const employeeWithDepartmentId = {...employee,department_id:employee.department? employee.department.id:null,department:undefined};
            return employeeWithDepartmentId;
        }

    }

    async findOneByemail(email:string):Promise<Employee>{
        const employee = await this.employeeRepository.findOne({where:{email:email},relations:['department','address']});
        if (employee){
            const employeeWithDepartmentId = {...employee,department_id:employee.department? employee.department.id:null,department:undefined};
            return employeeWithDepartmentId;
        }
    }

    //write all other functions

    async saveId(emp:Employee):Promise<Employee>{
        const newEmp =  await this.employeeRepository.save(emp);
        const employeeWithDepartmentId = {...newEmp,department_id:newEmp.department? newEmp.department.id:null,department:undefined};
        return employeeWithDepartmentId;

    }

    softRemove(employee:Employee){
        this.employeeRepository.softRemove(employee);
    }
    
}

export default EmployeeRepository;