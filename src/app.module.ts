import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationService } from './conversation.service';
import { PrismaService } from './prisma.service';
import { ChatService } from './chat.service';

@Module({
  imports: [
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConversationService,
    ChatService,
    PrismaService
  ],
})
export class AppModule {}
