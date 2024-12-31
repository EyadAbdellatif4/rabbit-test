import { Injectable } from '@nestjs/common';
const Pushover = require('pushover-notifications');

@Injectable()
export class NotificationService {
  private pushover: any;

  constructor() {
    this.pushover = new Pushover({
      user: process.env.PUSHOVER_USER_KEY,
      token: process.env.PUSHOVER_APP_TOKEN,
    });
  }

  async sendNotification(
    message: string,
    userKeys: string | string[],
  ): Promise<void> {
    if (typeof userKeys === 'string') {
      userKeys = [userKeys];
    }
    for (const key of userKeys) {
      try {
        await this.pushover.send({
          message: message,
          user: key,
          // other options
        });
      } catch (error) {
        console.error(`Failed to send notification to user ${key}:`, error);
      }
    }
  }
}
