import { IsNotEmpty, IsString } from "class-validator";
import AbstractEntity from "../entity/abstract-entity";

class PutDepartmenDto extends AbstractEntity{
    @IsNotEmpty()
    @IsString()
    name:string;
}

export default PutDepartmenDto;