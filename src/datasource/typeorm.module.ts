import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { Folder } from 'src/folder/entity/folder.entity';
import { Image } from 'src/image/entity/image.entity';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'mysql',
            host: process.env.DATABASE_HOST || '127.0.0.1',
            port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
            username: process.env.DATABASE_USERNAME || 'root',
            password: process.env.DATABASE_PASSWORD || 'root',
            database: process.env.DATABASE_NAME || 'inkvi_images_store',
            entities: [User, Image, Folder],
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            synchronize: false,
          });
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
