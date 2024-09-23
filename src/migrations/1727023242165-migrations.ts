import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1727023242165 implements MigrationInterface {
  name = 'Migrations1727023242165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "folder" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_6278a41a706740c94c02e288df8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "image" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "image" bytea NOT NULL, "userId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "image_tags_tag" ("imageId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_25c79814df1c64505a94e1c9a11" PRIMARY KEY ("imageId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb0a8276058d9d4747e9d7b0ea" ON "image_tags_tag" ("imageId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a314e4dc3f17751aaf35c12c68" ON "image_tags_tag" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "folder" ADD CONSTRAINT "FK_a0ef64d088bc677d66b9231e90b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image" ADD CONSTRAINT "FK_dc40417dfa0c7fbd70b8eb880cc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_tags_tag" ADD CONSTRAINT "FK_fb0a8276058d9d4747e9d7b0ea1" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_tags_tag" ADD CONSTRAINT "FK_a314e4dc3f17751aaf35c12c681" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "image_tags_tag" DROP CONSTRAINT "FK_a314e4dc3f17751aaf35c12c681"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_tags_tag" DROP CONSTRAINT "FK_fb0a8276058d9d4747e9d7b0ea1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image" DROP CONSTRAINT "FK_dc40417dfa0c7fbd70b8eb880cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "folder" DROP CONSTRAINT "FK_a0ef64d088bc677d66b9231e90b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a314e4dc3f17751aaf35c12c68"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fb0a8276058d9d4747e9d7b0ea"`,
    );
    await queryRunner.query(`DROP TABLE "image_tags_tag"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "image"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "folder"`);
  }
}
