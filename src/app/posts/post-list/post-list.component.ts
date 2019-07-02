import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { Post } from '../post.model'
import { PostsService } from '../posts.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts:Post[] = []
  private postSbuscription : Subscription;

  constructor(public postService: PostsService) { }

  ngOnInit() {
    this.postService.getPosts()
    this.postSbuscription = this.postService.updatePostListener()
    .subscribe((posts:Post[]) =>{
      this.posts = posts
    })
  }

  onDelete(id: string){
    console.log('post id',id)
    this.postService.deletePost(id)
  }

  ngOnDestroy(){
    this.postSbuscription.unsubscribe()
  }

}
