import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisteredModules } from '@modules/modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        const {
          MONGODB_HOST,
          MONGODB_DB,
          MONGODB_PORT,
          MONGODB_PWD,
          MONGODB_USER,
        } = process.env;
        return {
          uri: `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`,
          user: MONGODB_USER,
          pass: MONGODB_PWD,
        };
      },
      inject: [ConfigService],
    }),
    ...RegisteredModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
