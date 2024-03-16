import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageDTO } from '../../Models/message.dto';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  messages!: MessageDTO[];

  constructor(private messageService: MessageService, private router: Router) {
    this.loadMessages();
  }

  private async loadMessages(): Promise<void> {
    try {
      this.messages = await this.messageService.getMessages();
    } catch (error: any) {
      this.messageService.errorLog(error);
    }
  }

  createMessage(): void {
    this.router.navigateByUrl('/message/');
  }

  updateMessage(msgId: number): void {
    this.router.navigateByUrl('/message/' + msgId);
  }

  async deleteMessage(msgId: number): Promise<void> {
    // show confirmation popup
    let result = confirm('Confirm delete message with id: ' + msgId + ' .');
    if (result) {
      try {
        const rowsAffected = await this.messageService.deleteMessage(msgId);
        if (rowsAffected.affected > 0) {
          this.loadMessages();
        }
      } catch (error: any) {
        this.messageService.errorLog(error);
      }
    }
  }
}
