import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePasswordts1691125826073 implements MigrationInterface {
    name = 'CreatePassword.ts1691125826073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
