import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/services/auth/auth/auth.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        process.env.DATABASE_URL ||
        'postgres://uzoqozqpejgnvk:0cc5040f745dba5f131c4202ada644acc6a4c835eb937c36130ead9ce550b327@ec2-54-83-137-206.compute-1.amazonaws.com:5432/d29l841jbohpao',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

// forRootAsync({
//   useFactory: async () =>
//     Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
// }
