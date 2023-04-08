import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'mysql')
    private usersRepository: Repository<User>,
    @InjectRepository(User, 'postgres')
    private userPostGresRepository: Repository<User>,
    @InjectRepository(User, 'sqlite')
    private userSqliteRepository: Repository<User>,
    private cloudinary: CloudinaryService,
  ) {}

  async createUserMySql(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({ ...createUserDto });
    return await this.usersRepository.save(newUser);
  }

  async getUserMySql(id: number): Promise<User | NotFoundException> {
    const user = await this.usersRepository.findOneBy({ id });
    if(!user){
      return new NotFoundException();
    }
    return user;
  }

  getAllUsersMySql(): Promise<User[]> {
    const users = this.usersRepository.find();
    return users;
  }

  async createUserPostGres(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userPostGresRepository.create({ ...createUserDto });
    return await this.userPostGresRepository.save(newUser);
  }

  async getUserPostGres(id: number): Promise<User | NotFoundException> {
    const user = await this.userPostGresRepository.findOneBy({ id });

    if(!user){
      return new NotFoundException();
    }
    return user;
  }

  getAllUsersPostGres(): Promise<User[]> {
    const users = this.userPostGresRepository.find();
    return users;
  }

  async uploadProfilePic(file: Express.Multer.File): Promise<string> {
    const profilePic = await this.cloudinary.uploadImage(file);
    return profilePic.url;
  }

  async createUserSqlite(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userSqliteRepository.create({ ...createUserDto });
    return await this.userSqliteRepository.save(newUser);
  }

  async getUserSqlite(id: number): Promise<User | NotFoundException> {
    const user = await this.userSqliteRepository.findOneBy({ id });

    if(!user){
      return new NotFoundException();
    }
    return user;
  }


  getAllUsersSqlite(): Promise<User[]> {
    const users = this.userSqliteRepository.find();
    return users;
  }

}
