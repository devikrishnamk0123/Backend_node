import { DataSource } from "typeorm";
import EmployeeController from "../controller/employee.controller";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";
import AppDataSource from "../db/postgres.db";
import { Employee } from "../entity/employee.entity";
//import EmployeeController from "../controller/employee.controller";
import { departmentService } from "./department.route";


const employeeService = new EmployeeService(new EmployeeRepository(AppDataSource.getRepository(Employee)),departmentService);

const employeeController = new EmployeeController(employeeService);
const employeeRoute = employeeController.router;

export default employeeRoute;