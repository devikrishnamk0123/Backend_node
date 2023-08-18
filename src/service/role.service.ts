import { Role } from "../utils/role.enum";

class RoleService
{
    getAllRoles(){
        const roles = Object.values(Role);
        return(roles);
    }
}

export default RoleService;