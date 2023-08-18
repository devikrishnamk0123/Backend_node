import { DataSource, Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository{

    private dataSource: DataSource;
    constructor(private departmentRepository: Repository<Department>){};

    saveId(dept:Department):Promise<Department>{
        return this.departmentRepository.save(dept);
    }

    find(): Promise<Department[]>{
        //const employeeRepository = this.datasource.getRepository(Employee);
        return this.departmentRepository.find();
    }

    findOneBy(id:number):Promise<Department>{
        //const employeeRepository = this.datasource.getRepository(Employee);
        return this.departmentRepository.findOne({
            where: {id:id}
        });
    }

    softRemove(department:Department):Promise<Department>{
        return(this.departmentRepository.softRemove(department));
    }
}

export default DepartmentRepository;