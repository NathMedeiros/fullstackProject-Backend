import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1684823133593 implements MigrationInterface {
    name = 'createUser1684823133593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "deletedAt" date`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "updatedAt"`);
    }

}
