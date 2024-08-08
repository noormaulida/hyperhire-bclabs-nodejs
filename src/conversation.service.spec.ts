import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from './conversation.service';
import { PrismaService } from './prisma.service';

describe('ConversationService', () => {
  let service: ConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationService, PrismaService],
    }).compile();

    service = module.get<ConversationService>(ConversationService);
  });

  describe('createConversation', () => {
    it('should create new convo', async() => {
      // Arrange
      const payload = {
        'model': 'M1',
        'title': 'T1',
      }

      // Act
      const chat = await service.createConversation(payload);

      // Assert
      expect(chat.model).toBe(payload.model);
      expect(chat.title).toBe(payload.title);
    });
  });
});