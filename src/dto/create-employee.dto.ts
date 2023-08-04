import { IsEmail, IsNotEmpty, IsString, ValidateNested, isEmail, isNotEmpty, isString } from "class-validator";
import Address from "../entity/address.entity"
import { Type } from "class-transformer";
import createAddressDto from "./create-address.dto";
class CreateEmployeeDto{
    
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
}

export default CreateEmployeeDto;