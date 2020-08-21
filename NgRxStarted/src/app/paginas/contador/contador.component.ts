import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset } from 'src/ngrx/conter/counter.actions';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  count$: Observable<number>;

  constructor(private store: Store<{ count: number}>) { 
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit() {
  }

  increment(){
    this.store.dispatch(new Increment());
  }

  decrement(){
    this.store.dispatch(new Decrement());
  }

  reset(){
    this.store.dispatch(new Reset());
  }

}
