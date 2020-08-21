import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/ngrx/post/post.model';
import { Store, select } from '@ngrx/store';
import { Reset, Upvote, Downvote, EditText } from 'src/ngrx/post/post.actions';

interface PostState {
  post: Post;
}

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  post$: Observable<Post>
  @ViewChild('textoInput') textoInput:ElementRef;

  constructor(private store: Store<PostState>) {
    this.post$ = this.store.pipe(select('post'));
  }

  ngOnInit() {
  }

  editText() {
    this.store.dispatch(new EditText(this.textoInput.nativeElement.value))
  }

  resetPost() {
    this.store.dispatch(new Reset())
  }

  upvote() {
    this.store.dispatch(new Upvote())
  }

  downvote() {
    this.store.dispatch(new Downvote())
  }

}
