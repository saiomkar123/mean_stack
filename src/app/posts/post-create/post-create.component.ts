import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enterTitle=''
  enterContent = ''

  @Output() postCreated = new EventEmitter<Post>()

  constructor(public postService: PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm){
    console.log(form)
    if(form.invalid){
      return
    }
    const post:Post = {
      "id":null,
      "title":form.value.title,
      "content":form.value.content
    }
    // console.log(post)
    this.postService.addPost(post)
    form.resetForm()
    // this.postCreated.emit(post)
  }

}
