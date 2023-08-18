import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";


class createAddressDto{

    @IsNotEmpty()
    @IsString()
    address_line_1: string;

    @IsNotEmpty()
    @IsString()
    address_line_2:string;

    @IsNotEmpty()
    @IsString()
    city:string;

    @IsNotEmpty()
    @IsString()
    state:string;

    @IsNotEmpty()
    @IsString()
    country:string;

    @IsNotEmpty()
    @IsString()
    pincode: string;
}

export default createAddressDto;