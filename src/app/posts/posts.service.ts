import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" }) //routing, makes service visible
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  //inject http client to fetch posts from server
  constructor(private http: HttpClient) {}
  getPosts() {
    //fetch posts from backend
    this.http
      .get<{ message: string; posts: any }>("http://87.96.130.79:9200/post/")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return { ...this.posts.find(p => p.id === id) };
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        post
      )
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }
}
