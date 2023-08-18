import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumn1691138024375 implements MigrationInterface {
    name = 'AddRoleColumn1691138024375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
    }

}
