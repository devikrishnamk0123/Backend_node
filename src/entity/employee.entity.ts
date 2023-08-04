import {Column, Entity ,CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn, OneToOne} from "typeorm";
import Address from "./address.entity";

@Entity("employees")
class Employee{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name: string;
    @Column({nullable:true})
    age:number;
    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn() //soft delete.
    deletedAt: Date;

    @OneToOne(()=>Address,(address)=>address.employee,{cascade: true}) // entity pointing to. function 
    address:Address;


}

export {Employee}