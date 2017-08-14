import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public items: FirebaseListObservable<any>;
  public msgVal = '';
  public name: any;
  public inPayload: boolean;

  constructor(public af: AngularFireDatabase) {
    this.inPayload = true;
    this.items = af.list('/messages', {
      query: {
        limitToLast: 5
      }
    });
    this.items.subscribe(data => {
      this.inPayload = false;
    });
  }

  ngOnInit() {
    this.name = sessionStorage.getItem('name');
  }

  // enviar as mensagens
  public chatSend(theirMessage: string) {
    theirMessage = theirMessage.trim();
    console.log(theirMessage);
    if (theirMessage !== '') {
      this.items.push({
        message: theirMessage,
        name: this.name
      });
    }
    this.msgVal = '';
  }

  public verifyPerfil(name): string {
    if (this.name === name) {
      return 'offset-2 offset-sm-6 box-chat-primary';
    } else {
      return 'box-chat-secondary';
    }
  }

  public logIn(value: boolean): void {
    if (value) {
      this.name = sessionStorage.getItem('name');
    } else {
      sessionStorage.clear();
      this.name = null;
    }
  }
}
