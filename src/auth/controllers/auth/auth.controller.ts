import { User } from 'src/users/entities/user.entity';
import {
  Post,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/auth/services/auth/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;

    delete user.password;

    return this.authService.generateJWT(user);
  }
}
