import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Message } from '../../../../classes/message';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from '../../../../services/chatroom.service';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef
  chatroom: any;
  chatInscription: Subscription[] = [];

  dummyData: Message[] = [
    {
      message: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble de",
      sender: {
        firstName: "ahmed",
        lastName: "ghoul",
        photoUrl: 'http://via.placeholder.com/150x150'
      },

    },
    {
      message: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble de",
      sender: {
        firstName: "nour",
        lastName: "lastnour",
        photoUrl: 'http://via.placeholder.com/150x150'
      },
    }
  ];
  chatroomMessages: any;
  constructor(private route: ActivatedRoute,
    private chatRoomService: ChatroomService,
    private loadService: LoadingService
  ) {
    this.chatInscription.push(
      this.chatRoomService.changeChatroom.subscribe(
        room => {
          this.chatroom = room;
          // this.loadService.loading.next(false)
        }
      )
    )
    this.chatInscription.push(
      this.chatRoomService.selectChatRoomMessage.subscribe(
        msg => {
          this.chatroomMessages = msg;
          // this.loadService.loading.next(false)
        }
      )
    )

  }

  ngOnInit() {
    this.scrollToButton();
    this.chatInscription.push(
      this.route.paramMap.subscribe(param => {
        const chatRoomId = param.get('id');
        this.chatRoomService.changeChatroom.next(chatRoomId);
      })
    )
  }


  ngOnDestroy() {
    this.chatInscription.forEach(sub => sub.unsubscribe())
  }

  ngAfterViewChecked() {
    this.scrollToButton();
  }

  scrollToButton() {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (error) {

    }
  }

}
