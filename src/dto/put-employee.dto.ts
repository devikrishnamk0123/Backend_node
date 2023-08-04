import { IsNotEmpty, IsString, ValidateNested, isNotEmpty, isString, validate } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import createAddressDto from "./create-address.dto";



class PutEmployeeDto{
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
}

export default PutEmployeeDto;