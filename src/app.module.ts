import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiService } from './api.service';
import { ConversationService } from './conversation.service';
import { PrismaService } from './prisma.service';
import { ChatService } from './chat.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ApiService,
    ConversationService,
    ChatService,
    PrismaService
  ],
})
export class AppModule {}
