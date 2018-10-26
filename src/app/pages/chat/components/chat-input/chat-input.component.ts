import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  newMesageText: string = '';

  constructor() { }

  ngOnInit() {
  }

  submit(message: string) {
    // TODO save text to firebase
    console.log('new Message:', message);

    this.newMesageText = ""

  }

}
