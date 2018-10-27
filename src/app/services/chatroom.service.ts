import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { LoadingService } from './loading.service';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { reverse } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  public chatrooms: Observable<any>
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectChatRoom: Observable<any>;
  public selectChatroomMessage: Observable<any>;
  selectChatRoomMessage: Observable<any>;

  constructor(private db: AngularFirestore,
    private auth: AuthService,
    private loadingService: LoadingService) {

    this.selectChatRoom = this.changeChatroom.pipe(switchMap(
      (chatId) => {
        if (chatId) {
          return this.db.doc(`chatrooms/${chatId}`).valueChanges()
        }
        return of(null)
      }
    ))

    this.selectChatRoomMessage = this.changeChatroom.pipe(switchMap(
      (chatId) => {
        if (chatId) {
          return this.db.collection(`chatrooms/${chatId}/messages`,
            ref => {
              return ref.orderBy('createAt', 'desc').limit(100)
            }).valueChanges()
            .pipe(map(res => res.reverse()))
        }
        return of(null)
      }
    ))

    this.chatrooms = this.db.collection('chatrooms').valueChanges();
  }



  createMessage(text) {
    const chatRoomId = this.changeChatroom.value;
    const message = {
      message: text,
      createAt: new Date(),
      sender: this.auth.user
    }

    this.db.collection(`chatrooms/${chatRoomId}/messages`).add(message);
  }
}
