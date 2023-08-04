import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";


class createAddressDto{

    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsNotEmpty()
    @IsString()
    pincode: string;
}

export default createAddressDto;