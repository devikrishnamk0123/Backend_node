import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreColumnsToAddress1691295283472 implements MigrationInterface {
    name = 'AddMoreColumnsToAddress1691295283472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_1" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_2" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying`);
        //await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "joining_date" SET NOT NULL`);
        //await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "experience" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "experience" DROP NOT NULL`);
        //await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "joining_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_1"`);
    }

}
