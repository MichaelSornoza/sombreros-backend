import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// import { AuthService } from '../services/auh/auth.service';
import { SECRET } from './../index.auth';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpresion: false,
      secretOrKey: SECRET,
    });
  }

  validate(payload: PayloadToken) {
    return payload;
  }
}
