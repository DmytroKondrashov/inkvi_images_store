import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1724611157959 implements MigrationInterface {
  name = 'Migrations1724611157959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`image_tags_tag\` (\`imageId\` int NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_fb0a8276058d9d4747e9d7b0ea\` (\`imageId\`), INDEX \`IDX_a314e4dc3f17751aaf35c12c68\` (\`tagId\`), PRIMARY KEY (\`imageId\`, \`tagId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_tags_tag\` ADD CONSTRAINT \`FK_fb0a8276058d9d4747e9d7b0ea1\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_tags_tag\` ADD CONSTRAINT \`FK_a314e4dc3f17751aaf35c12c681\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`image_tags_tag\` DROP FOREIGN KEY \`FK_a314e4dc3f17751aaf35c12c681\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_tags_tag\` DROP FOREIGN KEY \`FK_fb0a8276058d9d4747e9d7b0ea1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a314e4dc3f17751aaf35c12c68\` ON \`image_tags_tag\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fb0a8276058d9d4747e9d7b0ea\` ON \`image_tags_tag\``,
    );
    await queryRunner.query(`DROP TABLE \`image_tags_tag\``);
  }
}
