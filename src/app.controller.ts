
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { ConversationService } from './conversation.service';
import { ChatService } from './chat.service';
import { Conversation as ConvoModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private apiService: ApiService,
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
  ): Promise<any> {
    const { title, model, questions } = data;
    const newConvo = this.conversationService.createConversation({
      title,
      model
    });
    const newConvoId = ((await newConvo).id)
    
    // Integration API
    const response = await this.apiService.getChatbotResponse({model, questions});
    if (response) {
      for await (const result of response.results) {
          await this.chatService.createChat({
            question: result.question,
            answer: result.answer,
            conversation: {
              connect: { id: newConvoId }
            }
          });
      };
    }
    // End of Integration API
    return this.getConvoById(String(newConvoId));
  }
}
