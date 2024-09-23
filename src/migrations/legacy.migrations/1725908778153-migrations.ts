import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1725908778153 implements MigrationInterface {
  name = 'Migrations1725908778153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_ffe5d8577dc7876c62a40e4bce2\``,
    );
    await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`folderId\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`image\` ADD \`folderId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_ffe5d8577dc7876c62a40e4bce2\` FOREIGN KEY (\`folderId\`) REFERENCES \`folder\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
