import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  async getChatbotResponse(data: { model: string, questions: string[] }) {
    return lastValueFrom(this.httpService
      .post('http://localhost:5000/api/v1/llms', data)
      .pipe(
        map((res) => {
          return res.data;
        }))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      ));
  }
}

