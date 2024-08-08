
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Chat, Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(data: Prisma.ChatCreateInput): Promise<Chat> {
    return this.prisma.chat.create({
      data,
    });
  }
}
