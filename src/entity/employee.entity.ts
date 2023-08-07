import {Column, Entity ,CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn, OneToOne, ManyToMany, ManyToOne, JoinColumn} from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";
import Department from "./department.entity";
import { Role } from "../utils/role.enum";


@Entity("employees")
class Employee extends AbstractEntity{
    //@PrimaryGeneratedColumn()
    //id:number;
    @Column()
    name: string;
    @Column({nullable:true})
    age?:number;
    @Column()
    email: string;

    @Column()
    joining_Date: string;

    @Column()
    experience: number;

    //@CreateDateColumn()
    //createdAt: Date;
    //@UpdateDateColumn()
    //updatedAt: Date;

    //@DeleteDateColumn() //soft delete.
    //deletedAt: Date;

    @OneToOne(()=>Address,(address)=>address.employee,{cascade: true}) // entity pointing to. function 
    address:Address;

    @Column()
    password:string;

    @ManyToOne(()=>Department,(department)=>department.employee)
    @JoinColumn()
    department: Department;

    
    @Column({default:Role.DEVELOPER})
    role:Role;
}

export {Employee}