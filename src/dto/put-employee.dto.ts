import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested, isNotEmpty, isNumber, isString, validate } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import createAddressDto from "./create-address.dto";
import AbstractEntity from "../entity/abstract-entity";
import Department from "../entity/department.entity";
import { Role } from "../utils/role.enum";
import PatchAddressDto from "./patch-address.dto";



class PutEmployeeDto extends AbstractEntity{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @Type(()=>createAddressDto)
    @ValidateNested({each:true})
    address: Address;

    //@IsNotEmpty()
    //@IsNumber()
    //age:number;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsNotEmpty()
    @IsNumber()
    departmentId: number;

    @IsNotEmpty()
    @IsNumber()
    experience:number;

    @IsNotEmpty()
    @IsString()
    joining_date:string;

    @IsNotEmpty()
    @IsEnum(Role)
    role:Role;
}

export default PutEmployeeDto;