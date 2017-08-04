import { Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  msg: FirebaseListObservable<any>;
  provider = new firebase.auth.FacebookAuthProvider();
  name: any;
  msgVal = '';

  constructor(public af: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.msg = af.list('/messages', {
      query: {
        limitToLast: 5
      }
    });
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
    });
  }

  login() {
    firebase
      .auth()
      .signInWithPopup(this.provider)
      .then(function(result) {
        const token = result.credential.accessToken;
        const user = result.user;
      })
      .catch(function(error) {
        const errorCode = error.name;
        const errorMessage = error.message;
      });
  }

  chatSend(theirMessage: string) {
    this.msg.push({
      message: theirMessage,
      name: this.name.displayName
    });
    this.msgVal = '';
  }

  logout() {
    firebase.auth().signOut().then(
      function() {
        alert('Você saiu do chat, mas volte blz?');
      },
      function(error) {}
    );
  }
}
