import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1680930643426 implements MigrationInterface {
    name = 'NewMigration1680930643426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profilePic\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profilePic\` varchar(255) NOT NULL DEFAULT 'photo.png'`);
    }

}
