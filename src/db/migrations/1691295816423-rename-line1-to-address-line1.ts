import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameLine1ToAddressLine11691295816423 implements MigrationInterface {
    name = 'RenameLine1ToAddressLine11691295816423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_1"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "line1" TO "address_line_1"`); 
        // await queryRunner.query(`ALTER TABLE "address" ADD "address_line1" character varying NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "joining_date" SET NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "experience" SET NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "address_line_2" SET NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "city" SET NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" SET NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "country" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "country" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "city" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "address_line_2" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "experience" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "joining_date" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_1" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL`);
    }

}
