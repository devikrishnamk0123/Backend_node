

import express from "express"
import authenticate from "../middleware/authenticate.middleware";
import Authorize from "../middleware/authorize.middleware";
import RoleService from "../service/role.service";

class RoleController{
    public router: express.Router;

    constructor(private roleService:RoleService){
        this.router = express.Router();
        //this.employeeService = new EmployeeService();

        this.router.get("/",authenticate,this.getAllRoles);       

    }

    getAllRoles = async (req:express.Request,res:express.Response)=>{
        const roles = await this.roleService.getAllRoles();
        res.status(200).send(roles);
    }
}

export default RoleController;