import {Column, Entity ,CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn} from "typeorm";

@Entity("employees")
class Employee{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name: string;
    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn() //soft delete.
    deletedAt: Date;
}

export {Employee}