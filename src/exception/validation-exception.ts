import { ValidationError } from "class-validator";
import HttpException from "./http.exception";



class ValidationException extends HttpException{
    public error: ValidationError[];

    constructor (status: number,message:string,errors:ValidationError[]){
        super(status,message);

        this.error = errors;
    }
    public handleValidationError(errors:ValidationError[]){
        let handledErrorObject: Object = {};
        errors.forEach(element=>{
            const errorProperty = element.property;
            if (element.children.length > 0){
                handledErrorObject[errorProperty] = this.handleValidationError(element.children);
                return handledErrorObject;
            }
            else{
                handledErrorObject[errorProperty] = Object.values(element.constraints);
                //return handledErrorObject;
            }
        })
        return handledErrorObject;
    }
}

export default ValidationException;