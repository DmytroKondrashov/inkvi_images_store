import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1723926897653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`folder\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`userId\` int NULL,
        PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`user\` (
              \`id\` int NOT NULL AUTO_INCREMENT,
              \`email\` varchar(255) NOT NULL,
              \`password\` varchar(255) NOT NULL,
              PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE TABLE \`image\` (
              \`id\` int NOT NULL AUTO_INCREMENT,
              \`filename\` varchar(255) NOT NULL,
              \`image\` longblob NOT NULL,
              \`folderId\` int NULL,
              \`userId\` int NULL,
              PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`image\``);
    await queryRunner.query(`DROP TABLE \`folder\``);
  }
}
