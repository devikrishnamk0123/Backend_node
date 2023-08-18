import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested, isEmail, isNotEmpty, isNumber, isString } from "class-validator";
import Address from "../entity/address.entity"
import { Type } from "class-transformer";
import createAddressDto from "./create-address.dto";
import { Role } from "../utils/role.enum";
import AbstractEntity from "../entity/abstract-entity";
class CreateEmployeeDto extends AbstractEntity{
    
    @IsNotEmpty()
    @IsString()
    name:string;


    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>createAddressDto)
    address: Address

    @IsNotEmpty()
    @IsString()
    password: string;


    @IsNotEmpty()
    @IsEnum(Role)
    role:Role

    @IsNotEmpty()
    @IsNumber()
    departmentId: number;

    @IsNotEmpty()
    @IsNumber()
    experience:number;

    @IsNotEmpty()
    @IsString()
    joining_date:string;
}

export default CreateEmployeeDto;