import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([User], 'mysql'),
    TypeOrmModule.forFeature([User], 'postgres'),
    TypeOrmModule.forFeature([User], 'sqlite'),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
