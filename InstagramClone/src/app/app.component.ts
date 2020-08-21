import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'InstagramClone';

  ngOnInit(): void {
    var config = {
      apiKey: "AIzaSyALofPygjcwhcNhCTkJ07g9cii979umLQ8",
      authDomain: "jta-instagram-clone-c8ee4.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-c8ee4.firebaseio.com",
      projectId: "jta-instagram-clone-c8ee4",
      storageBucket: "jta-instagram-clone-c8ee4.appspot.com",
      messagingSenderId: "717118019248"
    };
    firebase.initializeApp(config);
  }


}
