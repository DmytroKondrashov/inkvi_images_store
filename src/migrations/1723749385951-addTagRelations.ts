import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTagRelations1723749385951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`image_tags_tag\` (
        \`imageId\` int NOT NULL, 
        \`tagId\` int NOT NULL, 
        PRIMARY KEY (\`imageId\`, \`tagId\`),
        INDEX \`IDX_imageId\` (\`imageId\`), 
        INDEX \`IDX_tagId\` (\`tagId\`),
        CONSTRAINT \`FK_image_tags_tag_imageId\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT \`FK_image_tags_tag_tagId\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`image_tags_tag\``);
  }
}
