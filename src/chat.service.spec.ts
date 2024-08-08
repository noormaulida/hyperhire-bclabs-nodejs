import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { PrismaService } from './prisma.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, PrismaService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  describe('createChat', () => {
    it('should create new chat', async() => {
      // Arrange
      const payload = {
        'question': 'Q1',
        'answer': 'A1',
        'conversationId': 1,
      }

      // Act
      const chat = await service.createChat(payload);

      // Assert
      expect(chat.question).toBe(payload.question);
      expect(chat.answer).toBe(payload.answer);
      expect(chat.conversationId).toBe(payload.conversationId);
    });
  });
});