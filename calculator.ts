interface calculator{
    add (a:number,b:number):number,
    sub (a:number,b:number):number,
    mul (a:number,b:number):number,
    div (a:number,b:number):number,
    percentage (a:number,b:number):number,
    power (a:number,b:number):number,
    fact (a:number):number
}

export class calcu implements calculator{
    result:number;

    add (a:number,b:number):number{
        this.result = a+b;
        console.log(this.result);
        return this.result;
    }

    sub (a:number,b:number):number{
        this.result = a-b;
        console.log(this.result);
        return this.result;
    }
    
    mul (a:number,b:number):number{
        this.result = a*b;
        console.log(this.result);
        return this.result;
    }

    div (a:number,b:number):number{
        if(b==0){
            console.log("Division by zero not possible");
            return -1;
        }
        this.result = a/b;
        console.log(this.result);
        return this.result;
    }

    percentage(a: number, b: number = 1): number {
        this.result = a*b/100;
        console.log(this.result);
        return (this.result);
    }

    power(a: number, b: number): number {
        this.result = Math.pow(a,b);
        console.log(this.result);
        return(this.result);
    }
    
    fact(a: number): number {

        if(a == 1){
            return a;
        }
        else
        {
           this.result = a*this.fact(a-1);
        }
        console.log(this.result);
        return(this.result);
    }
}

