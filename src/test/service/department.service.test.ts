import { DataSource } from "typeorm";
import DepartmentRepository from "../../repository/department.repository";
import DepartmentService from "../../service/department.service"
import Department from "../../entity/department.entity";
import CreateDepartmentDto from "../../dto/create-department.dto";
import { when } from "jest-when";


describe("test for department service",()=>{

    let departmentService: DepartmentService;
    let departmentRepository: jest.Mocked<DepartmentRepository>
    beforeAll(()=>{
        const dataSource:DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;

        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department)) as jest.Mocked<DepartmentRepository>
        departmentService = new DepartmentService(departmentRepository) as jest.Mocked<DepartmentService>

    });

    describe("Test for post department", ()=>{
        test('test for post department',async()=>{
            const SaveIdMock = jest.fn();
            const department = {
                name:"Finance"
            };
            const createDepartmentDto: CreateDepartmentDto = {
                name:"Finance",
                id:1,
                createdAt: expect.anything(),
                updatedAt:expect.anything()
            }
            when(SaveIdMock).calledWith(department).mockResolvedValue(department);
            departmentRepository.saveId = SaveIdMock;
            const dept = await departmentService.postDepartment(createDepartmentDto)

            expect(dept.name).toEqual(createDepartmentDto.name);
        })
    })

    describe("Test for get all departments",()=>{
        test("Test for get all departments",async()=>{
            const findMock = jest.fn();
            when(findMock).calledWith().mockResolvedValue([{"name":"HR"},{"name":"Finance"}])
            departmentRepository.find = findMock;
            const departmentArray: Department[] = await departmentService.getAllDepartments()
            expect(departmentArray.length).toBeGreaterThan(0)
        })
    })

    describe("test for getDepartment By Id",()=>{
        test("test for getdepartment with valid Id",async()=>{
            const findOneByMock = jest.fn();

            const id = 2
            const department:Department = {
                "name":"HR",
                "createdAt":new Date(),
                "updatedAt":new Date(),
                "id":3
            }
            when(findOneByMock).calledWith(2).mockResolvedValue(department)
            departmentRepository.findOneBy = findOneByMock;
            const dept = await departmentService.getDepartmentById(id);
            expect(dept?.name).toEqual(department.name);

        })

        test("test for getDepartment with invalid id",async()=>{
            const findOneByMock = jest.fn();
            const id = 4;
            
            when(findOneByMock).calledWith(4).mockResolvedValue(null)
            departmentRepository.findOneBy = findOneByMock;
            expect(async () => { await departmentService.getDepartmentById(4)}).rejects.toThrowError();
        })
    })

    describe("Test for delete department by id",()=>{
        test("test for delete department with valid id",async()=>{
            const findOneByMock = jest.fn();
            const mockDept:Department = {
                "name":"Management",
                "createdAt":new Date,
                "updatedAt": new Date,
                "id":3
            }
            when(findOneByMock).calledWith(4).mockResolvedValue(mockDept)
            departmentRepository.findOneBy = findOneByMock;

            //expect(departmentRepository.findOneBy).toHaveBeenCalled

            const softRemoveMock = jest.fn();
            when(softRemoveMock).calledWith(mockDept).mockResolvedValue(mockDept)
            departmentRepository.softRemove = softRemoveMock

            //expect(departmentRepository.softRemove).toHaveBeenCalled

            const dept = await departmentService.deleteDepartment(4)
            expect(departmentRepository.findOneBy).toHaveBeenCalled
            expect(departmentRepository.softRemove).toHaveBeenCalled

            expect(dept).toEqual(mockDept)
        })
    })
})