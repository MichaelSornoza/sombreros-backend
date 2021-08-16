import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const SALT_ROUND = 15;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | boolean | string> {
    // console.log(createUserDto);

    let cleanUser = createUserDto;

    const hashedPassword = await bcrypt.hash(cleanUser.password, SALT_ROUND);

    cleanUser = { ...cleanUser, password: hashedPassword };

    const user = await this.usersRepository.save(cleanUser);

    if (!user) {
      throw new BadRequestException('Error al crear el usuario');
    }

    const newUser = this.findByEmail(user.email);

    return newUser;
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  async findOne(id: string): Promise<User | string> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`El #${id} no existe`);
    }

    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    return user;
  }
}
