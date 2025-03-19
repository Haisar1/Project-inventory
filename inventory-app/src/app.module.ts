import { EnvConfiguration } from './config/env.config';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JoiValidationSchema } from './config/joi.validation';
import { Machine } from './machines/entities/machine.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: EnvConfiguration().dbHost,
      port: +EnvConfiguration().dbPort,
      database: EnvConfiguration().dbName,
      username: EnvConfiguration().dbUsername,
      password: EnvConfiguration().dbPassword,
      autoLoadEntities: true,
      entities: [Machine],
      synchronize: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}