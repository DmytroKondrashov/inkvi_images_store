// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class AddTagEntity1723707130556 implements MigrationInterface {
//   name = 'AddTagEntity1723707130556';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`DROP TABLE \`tag\``);
//   }
// }
