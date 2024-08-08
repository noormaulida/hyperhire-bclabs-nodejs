
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Conversation, Prisma } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async conversation(
    conversationWhereUniqueInput: Prisma.ConversationWhereUniqueInput,
  ): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: conversationWhereUniqueInput,
      include: {
        chats: true,
      }
    });
  }

  async conversations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConversationWhereUniqueInput;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput;
  }): Promise<Conversation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.conversation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createConversation(data: Prisma.ConversationCreateInput): Promise<Conversation> {
    return this.prisma.conversation.create({
      data,
    });
  }
}
