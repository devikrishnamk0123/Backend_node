import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { Employee } from "../../entity/employee.entity";
import { when } from "jest-when";
import Address from "../../entity/address.entity";

describe('Employee Service tests',()=>{
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    beforeAll(()=>{

        const dataSource:DataSource = {
            getRepository:jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService = new EmployeeService(employeeRepository);
    });

    describe('Test for getEmployeeById',()=>{

        test('test employee for id 1',async ()=>{
            const mockedFunction = jest.fn();
            const empObj = new Employee();
            empObj.name = "12344"
            empObj.email= "21314@gmail.com"
            empObj.age = 342;

            //const address = new Address()

            when(mockedFunction).calledWith(1).mockResolvedValueOnce(empObj);
            employeeRepository.findOneBy = mockedFunction;
            const employee = await employeeService.getEmployeeById(1);
            expect(employee).toStrictEqual({'name': "12344","email":"21314@gmail.com","age" :342});
        });

        test('test employee for id 1',async ()=>{
            const mockedFunction = jest.fn();
            //const address = new Address()

            when(mockedFunction).calledWith(1).mockResolvedValueOnce(null);
            employeeRepository.findOneBy = mockedFunction;
            //const employee = await employeeService.getEmployeeById(1);
            expect(async()=>{await employeeService.getEmployeeById(1)}).rejects.toThrowError();
        });        
    });
})