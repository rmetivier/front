import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService, Message } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('messageState', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      transition('visible => hidden', [
        animate('0.5s ease-out')
      ]),
      transition('hidden => visible', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class MessageComponent implements OnInit {
  message: Message | null = null;
  show = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.message$.subscribe((message: Message) => {
      this.message = message;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, message.duration || 5000);
    });
  }
}
