import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExperienceToEmployee1691294265517 implements MigrationInterface {
    name = 'AddExperienceToEmployee1691294265517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "experience" integer`);
        //await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "joining_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "joining_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "experience"`);
    }

}
