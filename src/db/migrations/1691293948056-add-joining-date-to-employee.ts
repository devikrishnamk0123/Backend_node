import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoiningDateToEmployee1691293948056 implements MigrationInterface {
    name = 'AddJoiningDateToEmployee1691293948056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "joining_date" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "joining_date"`);
    }

}
