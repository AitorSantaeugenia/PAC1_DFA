import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Message } from './messages/entities/message.entity';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/services/messages.service';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Message])],
  controllers: [AppController, MessagesController],
  providers: [AppService, MessagesService],
})
export class AppModule {}
