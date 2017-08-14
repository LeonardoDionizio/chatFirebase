import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PanelComponent } from './panel/panel.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './shared/loader/loader.component';

// Configurações de conexão do firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyBSPDqsWRkuGEK7Q7_fiMA7ZOSj8om2x3M',
  authDomain: 'chatapp-c8f50.firebaseapp.com',
  databaseURL: 'https://chatapp-c8f50.firebaseio.com',
  projectId: 'chatapp-c8f50',
  storageBucket: 'chatapp-c8f50.appspot.com',
  messagingSenderId: '1037362870910'
};

@NgModule({
  declarations: [AppComponent, PanelComponent, HeaderComponent, FooterComponent, LoginComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
