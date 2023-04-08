import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

const postgresConfig = config.get('postgresConfig');
const sqliteConfig = config.get('sqliteConfig');
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.username,
      password: postgresConfig.password,
      database: postgresConfig.database,
      entities: ['./dist/**/*.entity.js'],
      name: 'postgres',
      synchronize: postgresConfig.synchronize,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: sqliteConfig.database,
      entities: ['./dist/**/*.entity.js'],
      synchronize: sqliteConfig.synchronize,
      name: 'sqlite',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
