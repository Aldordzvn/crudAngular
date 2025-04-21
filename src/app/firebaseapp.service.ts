import { Injectable } from '@angular/core';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseappService {

  firebaseConfig = {
    apiKey: "AIzaSyDJAxQcnQ9RAWmj1OEbAOYdPL2QG1hSekg",
    authDomain: "crud-angular-532cd.firebaseapp.com",
    databaseURL: "https://crud-angular-532cd-default-rtdb.firebaseio.com",
    projectId: "crud-angular-532cd",
    storageBucket: "crud-angular-532cd.firebasestorage.app",
    messagingSenderId: "55148169998",
    appId: "1:55148169998:web:752880a035ea1b55fb655f"
  };

  public auth: Auth;
  public firebase: Firestore;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    this.firebase = getFirestore(app);
   }
}
