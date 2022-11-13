import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [AppController],
})
export class AppModule { }
