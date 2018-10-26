import { Component, OnInit } from '@angular/core';
import { Message } from '../../../../classes/message';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {


  dummyData: Message[] = [
    {
      message: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble de",
      sender: {
        firstName: "ahmed",
        lastName: "ghoul",
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble de",
      sender: {
        firstName: "nour",
        lastName: "lastnour",
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
