import { Component, OnInit }                  from '@angular/core';
import { AngularFireAuth }                    from '@angular/fire/auth';
import { AngularFirestore }                   from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMessageModel }                      from './models/imessage.model';
import { IUserModel }                         from './models/iuser.model';

@Component({
  selector   : 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls  : ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public user    : IUserModel;
  public messages: IMessageModel[] = [];
  public form = new FormGroup({ message: new FormControl('', Validators.required) });

  constructor(
    public  fireAuth : AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.fireAuth.user.subscribe(user => {
      this.user = { uid: user.uid, name: user.displayName };
      this.loadMessages();
    });
  }

  jumpToLastMessage() {
    setTimeout(() => {
      var messageBody           = document.querySelector('#messages');
          messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }, 50);
  }

  onSubmit() {
    if (this.form.valid) {
      var message: IMessageModel = {
        message: this.form.get('message').value,
        user   : this.user,
        date   : + new Date()
      };
      this.form.reset();
      this.firestore.collection<IMessageModel>('messages').add(message).then(result => {
        console.log('Mensagem enviada!');
      });
    }
  }

  loadMessages() {
    this.firestore.collection<IMessageModel>('messages')
      .valueChanges().subscribe(messages => {
        this.messages = messages;
        this.jumpToLastMessage();
      });
  }

  sortMessages(messages: IMessageModel[]) {
    return messages.sort(({ date: a }, { date: b }) => b - a).reverse();
  }

}
