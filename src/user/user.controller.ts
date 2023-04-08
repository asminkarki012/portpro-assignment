import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { FormDataRequest } from 'nestjs-form-data';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api')
export class UserController {
  constructor(private usersService: UserService) {}

  //for mysql
  @Post('/v1/user')
  //   @FormDataRequest()
  @UseInterceptors(FileInterceptor('profilePic'))
  async createUserMySql(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 250000 }), //250kb
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<User> {
    console.log('create route');
    createUserDto.profilePic = await this.usersService.uploadProfilePic(file); // console.log("profielPic upload");
    return await this.usersService.createUserMySql(createUserDto);
  }

  @Get('/v1/user')
  getUserMySql(): Promise<User[]> {
    return this.usersService.getAllUsersMySql();
  }

  //for postgres
  @Post('/v2/user')
  @UseInterceptors(FileInterceptor('profilePic'))
  async createUserPostGres(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 250000 }), //250kb
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<User> {
    console.log('create route');
    createUserDto.profilePic = await this.usersService.uploadProfilePic(file);
    return await this.usersService.createUserPostGres(createUserDto);
  }

  @Get('/v2/user')
  getUserPostGres(): Promise<User[]> {
    return this.usersService.getAllUsersPostGres();
  }

  //for sqlite3
  @Post('/v3/user')
  @UseInterceptors(FileInterceptor('profilePic'))
  async createUserSqlite(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 250000 }), //250kb
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<User> {
    createUserDto.profilePic = await this.usersService.uploadProfilePic(file);
    return await this.usersService.createUserSqlite(createUserDto);
  }


  @Get('/v3/user')
  getUserSqlite(): Promise<User[]> {
    return this.usersService.getAllUsersSqlite();
  }
}
