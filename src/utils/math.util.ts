class MathUtil{
    static average(number1: number,number2:number){ //static functions need not have object to call them.called directly in the class.
        return this.sum(6,number2)/2;
    }

    static sum(number1:number,number2:number){
        return(number1-number2);
    }
}

export default MathUtil;