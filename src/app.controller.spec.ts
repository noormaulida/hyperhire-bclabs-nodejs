import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiService } from '../src/api.service';
import { ConversationService } from '../src/conversation.service';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../src/prisma.service';
import { ChatService } from '../src/chat.service';
import { HttpModule} from '@nestjs/axios';

describe('AppController', () => {
  let appController: AppController;
  let apiService: ApiService;
  let conversationService: ConversationService;
  let chatService: ChatService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [ApiService, ConversationService, ChatService, PrismaService, HttpService],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    
    apiService =  moduleRef.get<ApiService>(ApiService);
    conversationService = moduleRef.get<ConversationService>(ConversationService);
    chatService = moduleRef.get<ChatService>(ChatService);
    appController = moduleRef.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
