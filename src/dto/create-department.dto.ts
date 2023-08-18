import { IsNotEmpty, IsString, isNotEmpty, isNotEmptyObject } from "class-validator";
import AbstractEntity from "../entity/abstract-entity";


class CreateDepartmentDto extends AbstractEntity{
    @IsNotEmpty()
    @IsString()
    name:string;

}

export default CreateDepartmentDto;