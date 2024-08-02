import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Message {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
  duration?: number; // Durée en millisecondes
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<Message>();
  message$ = this.messageSubject.asObservable();

  showMessage(message: Message) {
    this.messageSubject.next(message);
  }
}
