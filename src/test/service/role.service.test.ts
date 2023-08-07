import { Role } from "../../utils/role.enum"

import RoleService from "../../service/role.service"

describe("Roles test",()=>{

    const roleService = new RoleService;

    test("Get all roles",()=>{
        const roles = Object.values(Role);

        const roleslist =  roleService.getAllRoles();
        expect(roleslist).toEqual(roles);
    })
})