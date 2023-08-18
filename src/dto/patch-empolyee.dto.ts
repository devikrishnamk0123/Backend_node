import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import createAddressDto from "./create-address.dto";
import Address from "../entity/address.entity";
import { Role } from "../utils/role.enum";
import PatchAddressDto from "./patch-address.dto";

class PatchEmployeeDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @Type(()=>PatchAddressDto)
    @ValidateNested()
    address: Address;

    @IsOptional()
    @IsString()
    password:string;

    @IsOptional()
    @IsNumber()
    departmentId: number;

    @IsOptional()
    @IsNumber()
    experience:number;

    @IsOptional()
    @IsString()
    joining_date:string;

    @IsOptional()
    @IsEnum(Role)
    role:Role;

}

export default PatchEmployeeDto;