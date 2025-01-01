import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError } from 'rxjs';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class NotificationService {
  constructor(private readonly http: HttpService) {}

  sendPushoverNotification(
    token: string,
    user: string,
    message: string,
  ): Observable<any> {
    const url = 'https://api.pushover.net/1/messages.json';
    const data = new URLSearchParams();
    data.append('token', token);
    data.append('user', user);
    data.append('message', message);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return this.http.post(url, data.toString(), config).pipe(
      catchError((error) => {
        console.error('Error sending Pushover notification:', error);
        throw new HttpException(
          'Failed to send notification',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
