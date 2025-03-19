import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinesModule } from './machines/machines.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ConfigModule } from '@nestjs/config';

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
      synchronize: true,
    }),
    MachinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
