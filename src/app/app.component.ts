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
  items: FirebaseListObservable<any>;
  provider = new firebase.auth.FacebookAuthProvider();
  name: any;
  msgVal = '';

  constructor(public af: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.items = af.list('/messages', {
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
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.name;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // const credential = .credential;
        // ...
      });

    // firebase
    //   .auth()
    //   .signInWithRedirect(new firebase.auth.FacebookAuthProvider())
    //   .then(function(result) {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     const token = result.credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // ...
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     // const errorCode = error.code;
    //     console.log('erro');
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     // const email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     // const credential = error.credential;
    //     // ...
    //   });
  }

  chatSend(theirMessage: string) {
    this.items.push({
      message: theirMessage,
      name: this.name.displayName
    });
    this.msgVal = '';
  }

  logout() {
    firebase.auth().signOut().then(
      function() {
        // Sign-out successful.
      },
      function(error) {
        // An error happened.
      }
    );
  }
}
