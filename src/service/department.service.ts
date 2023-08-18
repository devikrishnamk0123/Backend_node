import CreateDepartmentDto from "../dto/create-department.dto";
import PutDepartmenDto from "../dto/put-department.dto";
import Department from "../entity/department.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";



class DepartmentService {
    constructor(private departmentRepository:DepartmentRepository)
    {
        //this.employeeRepository = new EmployeeRepository();
    }

    async postDepartment(departmentObj:CreateDepartmentDto){
        const department = new Department();
        department.name = departmentObj.name;
        
        return this.departmentRepository.saveId(department);
    }

    getAllDepartments():Promise<Department[]>{
        return this.departmentRepository.find();
    }

    async getDepartmentById(id:number):Promise<Department|null>
    {
        const department = await this.departmentRepository.findOneBy(id);
        if (!department){
            throw new HttpException(404,`Department not found with id: ${id}`);
            //throw new Error(`Employee not found with id: ${id}`); 
        }
        //employee.name = "xyz";
        //return this.employeeRepository.findOneBy(id);
        return department;
    }

    async putDepartmentById(deptObj:PutDepartmenDto,id:number):Promise<Department>
    {

        console.log(id);
        const department = await this.departmentRepository.findOneBy(id);
        if (department)
        {
            department.name = deptObj.name;
            department.updatedAt = new Date();

            return this.departmentRepository.saveId(department);
        }
    }

    async deleteDepartment(id:number):Promise<Department>{
        const department = await this.departmentRepository.findOneBy(id);
        if (department)
        {
            const removeDepartment = await this.departmentRepository.softRemove(department);
            return removeDepartment;
        }
    }
}

export default DepartmentService;