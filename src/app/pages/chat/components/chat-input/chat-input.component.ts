import { Component, OnInit } from '@angular/core';
import { ChatroomService } from '../../../../services/chatroom.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  newMesageText: string = '';

  constructor(private chatRoomService: ChatroomService) { }

  ngOnInit() {
  }

  submit(message: string) {
    // TODO save text to firebase
    console.log('new Message:', message);
    this.chatRoomService.createMessage(message);
    this.newMesageText = ""

  }

}
