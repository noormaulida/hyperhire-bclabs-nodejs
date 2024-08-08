
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ChatService } from './chat.service';
import { Conversation as ConvoModel, Chat as ChatModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly chatService: ChatService,
  ) {}

  @Get('conversations')
  async getAllConvos(): Promise<ConvoModel[]> {
    return this.conversationService.conversations({
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get('conversations/:id')
  async getConvoById(@Param('id') id: string): Promise<ConvoModel> {
    return this.conversationService.conversation({ id: Number(id) });
  }

  @Post('conversations')
  async sendRequestToLLM(
    @Body() data: { title: string; model: string, questions: string[] },
  ): Promise<ConvoModel> {
    const { title, model, questions } = data;
    const newConvo = this.conversationService.createConversation({
      title,
      model
    });
    const newConvoId = ((await newConvo).id)

    // Integration API here
    // 

    questions.forEach(question => {
      this.chatService.createChat({
        question,
        answer: 'Temp answer',
        conversation: {
          connect: { id: newConvoId }
        }
      });
    });
    return newConvo
  }
}
