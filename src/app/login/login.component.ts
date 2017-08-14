import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  provider = new firebase.auth.FacebookAuthProvider();
  public name: any;

  @Output() public logIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.name = auth;
        sessionStorage.setItem('name', this.name.displayName);
      }
    });
  }

  ngOnInit() {}

  // fazer login com facebook
  loginFacebook() {
    firebase
      .auth()
      .signInWithPopup(this.provider)
      .then(result => sessionStorage.setItem('name', result.user['displayName']))
      .then(data => this.logIn.emit(true))
      .catch(error => {
        const errorCode = error.name;
        const errorMessage = error.message;
      });
  }

  // deslogar
  logout() {
    this.name = undefined;
    firebase.auth().signOut().then(
      () => {
        alert('Você saiu do chat, mas volte tá?');
        this.logIn.emit(false);
      },
      error => {}
    );
  }
}
