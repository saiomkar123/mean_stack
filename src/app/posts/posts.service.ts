import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Post } from './post.model'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private Http: HttpClient) { }

  private posts : Post[] = []
  private postsUpdate = new Subject<Post[]>()

  getPosts(){
    // This will not change the original value
    // return [...this.posts]
    this.Http.get<any>('http://localhost:3000/api/posts')
    .pipe(map((response)=>{
      return response.map((obj)=>{
        return {
          "title": obj.title,
          "content": obj.content,
          "id": obj._id
        }
      })
    }))
    .subscribe((formatedresponse)=>{
      console.log('response from server',formatedresponse)
      this.posts = formatedresponse;
      this.postsUpdate.next([...this.posts])
    })
  }
  updatePostListener(){
    return this.postsUpdate.asObservable()
  }
  addPost(post: Post){
    // console.log('service',post)
    this.Http.post<any>("http://localhost:3000/api/posts",post)
    .subscribe((res)=>{
      console.log('response from server add post',res)
      const response = res.success
      this.posts.push({
        id: response._id,
        title: response.title,
        content: response.content
      })
      this.postsUpdate.next([...this.posts])
    })
  }
  deletePost(id: string){
    this.Http.delete("http://localhost:3000/api/posts/" + id)
    .subscribe((message)=>{
      console.log(message)
      const updatedPost = this.posts.filter((post) => {
        return post.id !== id
      })
      this.posts = updatedPost;
      this.postsUpdate.next([...this.posts])
    })
  }
}
