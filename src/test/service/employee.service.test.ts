import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { Employee } from "../../entity/employee.entity";
import { when } from "jest-when";
import Address from "../../entity/address.entity";
import PutEmployeeDto from "../../dto/put-employee.dto";
import createAddressDto from "../../dto/create-address.dto";
import { Role } from "../../utils/role.enum";
import Department from "../../entity/department.entity";
import DepartmentRepository from "../../repository/department.repository";
import DepartmentService from "../../service/department.service";
import CreateEmployeeDto from "../../dto/create-employee.dto";
//import {departmentService} from "../route/department.route"
//import { departmentService} from ;

describe('Employee Service tests', () => {
    let employeeService: EmployeeService;
    let employeeRepository: jest.Mocked<EmployeeRepository>;
    //let departmentRepository: DepartmentRepository;
    let departmentService: jest.Mocked<DepartmentService>;
    let departmentRepository: jest.Mocked<DepartmentRepository>;
    beforeAll(() => {

        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;

        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department)) as jest.Mocked<DepartmentRepository>
        departmentService = new DepartmentService(departmentRepository) as jest.Mocked<DepartmentService>
        employeeService = new EmployeeService(employeeRepository,departmentService);
    });

    describe('Test for getEmployeeById', () => {

        test('test employee for id 1', async () => {
            const mockedFunction = jest.fn();
            const empObj = new Employee();
            empObj.name = "12344"
            empObj.email = "21314@gmail.com"
            empObj.age = 342;

            //const address = new Address()

            when(mockedFunction).calledWith(1).mockResolvedValueOnce(empObj);
            employeeRepository.findOneBy = mockedFunction;
            const employee = await employeeService.getEmployeeById(1);
            expect(employee).toStrictEqual({ 'name': "12344", "email": "21314@gmail.com", "age": 342 });
        });

        test('test employee for id 1', async () => {
            const mockedFunction = jest.fn();
            //const address = new Address()

            when(mockedFunction).calledWith(1).mockResolvedValueOnce(null);
            employeeRepository.findOneBy = mockedFunction;
            //const employee = await employeeService.getEmployeeById(1);
            expect(async () => { await employeeService.getEmployeeById(1) }).rejects.toThrowError();
        });
    });

    describe('Test if getAllEmployees returns employees', () => {

        test('should return all employees if they exist', async () => {
            const mockedFunction = jest.fn();

            const mockedDepartment: Department = {
                id: 1,
                name: "HR",
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            const dummyAddress = {
                id: 16,
                address_line_1: "Kannur",
                pincode: "1234",
                address_line_2: "Pallikunn",
                city: "kannur",
                state: "Kerala",
                country: "kannur",
                createdAt: new Date(),
                updatedAt: new Date(),

            }
            const dummyEmployees: Employee[] = [
                {
                    id: 19,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    name: "vaishnav",
                    age: 4,
                    email: "vaishnav@gmail.com",
                    joining_Date: "3/7/23",
                    experience: 7,
                    password: "$2b$10$OPSXe3IOp1KFexqSsKgrd.IMbOtvOl76Kav.QPzyh2.ymT8j8JQh.",
                    role: Role[Role.HR],
                    address: dummyAddress as Address,
                    department: mockedDepartment
                }
            ]



            when(mockedFunction).calledWith().mockResolvedValue(dummyEmployees);
            employeeRepository.find = mockedFunction;

            const employees = await employeeService.getAllEmployees();
            console.log(employees.length);
            expect(employees.length).toBeGreaterThan(0);
        })

        test('should not return employees since no employees in system', async () => {
            const mockedFunction = jest.fn();
            when(mockedFunction).calledWith().mockResolvedValue([]);
            employeeRepository.find = mockedFunction;

            const employees = await employeeService.getAllEmployees();
            expect(employees.length).toEqual(0);
        })

    })



    // put testing 
    describe('Test for put employeeeById', () => {

        test('Test put employee for valid id', async () => {
            const findEmployeeByIdMock = jest.fn();
            const mockedDepartment: Department = {
                id: 1,
                name: "HR",
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            const dummyAddress = {
                id: 16,
                address_line_1: "Kannur",
                pincode: "1234",
                address_line_2: "Pallikunn",
                city: "kannur",
                state: "Kerala",
                country: "kannur",
                createdAt: new Date(),
                updatedAt: new Date(),

            }

            const dummyEmployee: Employee = {

                id: 19,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: "vaishnav",
                //age: 4,
                email: "vaishnav@gmail.com",
                joining_Date: "3/7/23",
                experience: 7,
                password: "$2b$10$OPSXe3IOp1KFexqSsKgrd.IMbOtvOl76Kav.QPzyh2.ymT8j8JQh.",
                role: Role[Role.HR],
                address: dummyAddress as Address,
                department: mockedDepartment
            }


            employeeRepository.findOneBy = findEmployeeByIdMock;
            when(findEmployeeByIdMock).calledWith(1).mockResolvedValue(dummyEmployee)

            const findDepartmentByIdMock = jest.fn();

           when(findDepartmentByIdMock).calledWith(5).mockResolvedValue(mockedDepartment);
           departmentService.getDepartmentById = findDepartmentByIdMock;


           const saveIdMock = jest.fn();
           employeeRepository.saveId = saveIdMock;

           when(saveIdMock).calledWith(dummyEmployee).mockResolvedValue(dummyEmployee)

            const putEmployeeDto: PutEmployeeDto = {
                id: 19,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: "vaishnav",
                //age: 4,
                email: "vaishnav@gmail.com",
                joining_date: "3/7/23",
                experience: 7,
                password: "$2b$10$OPSXe3IOp1KFexqSsKgrd.IMbOtvOl76Kav.QPzyh2.ymT8j8JQh.",
                role: Role[Role.HR],
                address: dummyAddress as Address,
                departmentId: 5
            }



            const employee = await  employeeService.putEmployeeById(putEmployeeDto,1)
            expect(employee).toStrictEqual({id: 19,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
                name: "vaishnav",
                //age: 4,
                email: "vaishnav@gmail.com",
                joining_Date: "3/7/23",
                experience: 7,
                password: expect.anything(),
                role: Role[Role.HR],
                address: dummyAddress as Address,
                department: mockedDepartment});
        })

        test('Test put employee for invalid id',async()=>{

            const dummyAddress = {
                id: 16,
                address_line_1: "Kannur",
                pincode: "1234",
                address_line_2: "Pallikunn",
                city: "kannur",
                state: "Kerala",
                country: "kannur",
                createdAt: new Date(),
                updatedAt: new Date(),

            }

            const putEmployeeDto: PutEmployeeDto = {
                id: 19,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: "vaishnav",
                //age: 4,
                email: "vaishnav@gmail.com",
                joining_date: "3/7/23",
                experience: 7,
                password: "$2b$10$OPSXe3IOp1KFexqSsKgrd.IMbOtvOl76Kav.QPzyh2.ymT8j8JQh.",
                role: Role[Role.HR],
                address: dummyAddress as Address,
                departmentId: 5
            }
            const findEmployeeByIdMock = jest.fn();
            when(findEmployeeByIdMock).calledWith(5).mockResolvedValue(null)
            employeeRepository.findOneBy = findEmployeeByIdMock

            expect(async () => { await employeeService.putEmployeeById(putEmployeeDto,1)}).rejects.toThrowError();
        })

    })

    describe('Test for post employee',()=>{
        test('test for valid post employee',async()=>{


            const dummyAddress : Address = {
                id: 16,
                address_line_1: "Kannur",
                pincode: "1234",
                address_line_2: "Pallikunn",
                city: "kannur",
                state: "Kerala",
                country: "kannur",
                createdAt: new Date(),
                updatedAt: new Date(),
                employee: {
                    name:"vaishnav",
                    email:"vaishnav@gmail.com",
                    password: "123134",
                    role: Role[Role.HR],
                    address:{
                        address_line_1:"Kannur",
                        address_line_2:"Pallikunn",
                        pincode: "1234",
                        city: "kannur",
                        state: "Kerala",
                        country: "kannur"
                    },
                    experience:7,
                    joining_Date:"3/7/23",
                    
                } as Employee

            }


            const createEmployeeDto: CreateEmployeeDto = {
                id: 20,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: "vaishnav",
                //age: 4,
                email: "vaishnav@gmail.com",
                joining_date: "3/7/23",
                experience: 7,
                password: "$2b$10$OPSXe3IOp1KFexqSsKgrd.IMbOtvOl76Kav.QPzyh2.ymT8j8JQh.",
                role: Role[Role.HR],
                address: dummyAddress as Address,
                departmentId: 5
            }

            const mockedDepartment: Department = {
                id: 1,
                name: "HR",
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            const newEmp = new Employee();
            newEmp.email = "vaishnav@gmail.com"
            newEmp.name = "vaishnav"
            newEmp.role = Role[Role.HR]
            newEmp.password = expect.anything();
            newEmp.department = mockedDepartment
            //const newAddress = dummyAddress
            newEmp.address = dummyAddress

            const getDepartmentByIdMock = jest.fn()
            when(getDepartmentByIdMock).calledWith(5).mockResolvedValue(5)

            departmentService.getDepartmentById = getDepartmentByIdMock

            const saveIdMock = jest.fn()
            when(saveIdMock).calledWith(newEmp).mockResolvedValue(createEmployeeDto)

            employeeRepository.saveId = saveIdMock;

            const employee = await employeeService.postEmployee(createEmployeeDto)
            expect(employee).toStrictEqual({id: 20,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: "vaishnav",
                //age: 4,
                email: "vaishnav@gmail.com",
                joining_date: "3/7/23",
                experience: 7,
                password: "$2b$10$OPSXe3IOp1KFexqSsKgrd.IMbOtvOl76Kav.QPzyh2.ymT8j8JQh.",
                role: Role[Role.HR],
                address: dummyAddress as Address,
                departmentId: 5
            })
                        
        })
    })

})