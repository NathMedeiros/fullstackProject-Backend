import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1684967173984 implements MigrationInterface {
    name = 'createUser1684967173984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "full_name" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "name" TO "full_name"`);
    }

}
