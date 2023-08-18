//import { Entity } from "typeorm";

import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";




class AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn() //soft delete.
    deletedAt?: Date;

}

export default AbstractEntity;