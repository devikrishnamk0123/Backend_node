import { DataSource, Repository, UpdateResult } from "typeorm"
import { Employee } from "../entity/employee.entity";
import AppDataSource from "../db/postgres.db";



class EmployeeRepository{
    private datasource: DataSource;

    constructor(private employeeRepository: Repository<Employee>){}
        //this.datasource = AppDataSource;     
    //}

    find(): Promise<Employee[]>{
        //const employeeRepository = this.datasource.getRepository(Employee);
        return this.employeeRepository.find();
    }


    findOneBy(id:number):Promise<Employee>{
        //const employeeRepository = this.datasource.getRepository(Employee);
        return this.employeeRepository.findOne({
            where: {id:id},
            relations:{
                address:true,
            },
        });
    }
    //write all other functions

    saveId(emp:Employee):Promise<Employee>{
        return this.employeeRepository.save(emp);
    }

    softRemove(employee:Employee){
        this.employeeRepository.softRemove(employee);
    }
    
}

export default EmployeeRepository;