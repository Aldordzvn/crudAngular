import { Injectable } from '@angular/core';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseappService {

  firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  public auth: Auth;
  public firebase: Firestore;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    this.firebase = getFirestore(app);
   }
}
